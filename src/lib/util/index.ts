import { Parser } from "@dbml/core";
import { Diagram, Entity, Field, getLocalDb } from "../db";

export function generateSlugFromName(name: string) {
  return name.replaceAll(/[\s]*/g, "-");
}

export async function createDiagram(data: { name: string }): Promise<string> {
  const { name } = data;
  const id = generateSlugFromName(name);
  const createdAt = new Date();
  return await getLocalDb().diagrams.add({
    id,
    name,
    code: "",
    createdAt: createdAt,
    updatedAt: createdAt,
  });
}

export async function isDiagramExistsById(id: string): Promise<boolean> {
  return (await getLocalDb().diagrams.where("id").equals(id).count()) != 0;
}

export async function isDiagramExistsByName(name: string): Promise<boolean> {
  return (await getLocalDb().diagrams.where("name").equals(name).count()) != 0;
}

export async function getDiagramById(diagramId: string) {
  return await getLocalDb().diagrams.where("id").equals(diagramId).first();
}

export async function getDiagramByName(diagramName: string) {
  return await getLocalDb().diagrams.where("name").equals(diagramName).first();
}

export async function deleteDiagram(id: string): Promise<void> {
  await getLocalDb().diagrams.delete(id);
}

export async function updateDiagramName(
  diagram: string | Diagram,
  newName: string
): Promise<boolean> {
  return !!(await getLocalDb().diagrams.update(diagram, { name: newName }));
}

export async function updateDiagramCode(
  diagram: string | Diagram,
  code: string
): Promise<boolean> {
  return !!(await getLocalDb().diagrams.update(diagram, { code }));
}

export async function createEntity(
  data: {
    name: string;
    x?: number;
    y?: number;
  },
  diagram: Pick<Diagram, "id">
) {
  const now = new Date();
  return await getLocalDb().entities.add({
    name: data.name,
    diagramId: diagram.id,
    x: data.x ?? 0,
    y: data.y ?? 0,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getEntites() {
  return await getLocalDb().entities.toArray();
}

export async function getEntityById(id: number): Promise<Entity | undefined> {
  return await getLocalDb().entities.where("id").equals(id).first();
}

export async function getEntityByName(
  name: string
): Promise<Entity | undefined> {
  return await getLocalDb().entities.where("name").equals(name).first();
}

export async function createEntityField(
  data: {
    name: string;
    idx: number;
    type: string;
    isUnique?: boolean;
    isPrimaryKey?: boolean;
    isNotNull?: boolean;
  },
  entity: { id: number } | number
) {
  return await getLocalDb().fields.add({
    name: data.name,
    idx: data.idx,
    entityId: entity instanceof Object ? entity.id : entity,
    type: data.type,
    isUnique: data.isUnique ?? false,
    isNotNull: data.isNotNull ?? false,
    isPrimaryKey: data.isPrimaryKey ?? false,
  });
}

export async function getEntityFields(entity: { id: number } | number) {
  return await getLocalDb()
    .fields.where("entityId")
    .equals(entity instanceof Object ? entity.id : entity)
    .toArray();
}

export async function updateEntityPosition(
  entity: number | Entity,
  position: { x: number; y: number }
): Promise<boolean> {
  return !!(await getLocalDb().entities.update(entity, {
    x: position.x,
    y: position.y,
  }));
}

const dbmlParser = new Parser();

export async function parseDbml(v: string) {
  try {
    return dbmlParser.parse(v, "dbml");
  } catch (e) {
    // console.error(e);
    return undefined;
  }
}

export async function syncDiagramDataWithEditorSchema(
  diagramId: string,
  dbData: ReturnType<typeof dbmlParser.parse>
) {
  const db = getLocalDb();
  await db.transaction("rw", db.entities, 'fields', async () => {
    const entites = await getEntites();
    const schema = dbData.findOrCreateSchema("public");

    const currentEntityNameToEntityIdMap = entites.reduce(
      (map, e) => map.set(e.name, e.id),
      new Map<string, number>()
    );
    const allTableIds = entites.reduce(
      (arr, entity) => arr.add(entity.id),
      new Set<number>()
    );
    const updatedTableIds = new Array<number>();
    const updatedTableData = new Array<(typeof schema.tables)[0]>();
    const newTables = schema.tables.reduce((set, v) => {
      const id = currentEntityNameToEntityIdMap.get(v.name);
      if (id) {
        updatedTableData.push(v);
        updatedTableIds.push(id);
        allTableIds.delete(id);
      } else set.push(v);
      return set;
    }, new Array<(typeof schema.tables)[0]>());

    // Takes care of deleted tables.
    const deletedTableIds = Array.from(allTableIds);
    await db.entities.bulkDelete(Array.from(deletedTableIds));
    await db.fields
      .where("entityId")
      .equals(Array.from(deletedTableIds))
      .delete();

    // Takes care of the new tables.
    for (const table of newTables) {
      const entityId = await createEntity(
        { name: table.name, x: 600, y: 300 },
        { id: diagramId }
      );
      let idx = 0;
      for (const field of table.fields) {
        await createEntityField(
          { idx, name: field.name, type: field.type.type_name },
          { id: entityId }
        );
        idx++;
      }
    }

    // Take care of updated data.
    for (const data of updatedTableData) {
      const entityId = currentEntityNameToEntityIdMap.get(data.name)!;
      const updatedFields = data.fields.map((f, idx) => {
        return {
          idx,
          entityId,
          name: f.name,
          type: f.type.type_name,
          isPrimaryKey: f.pk,
          isNotNull: f.not_null,
          isUnique: f.unique,
        };
      });
      await getLocalDb().fields.bulkPut(updatedFields);
    }
  });
}
