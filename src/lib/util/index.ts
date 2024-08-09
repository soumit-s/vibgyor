import { Diagram, Entity, getLocalDb } from "../db";

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

export async function deleteDiagram(id: string): Promise<void> {
  await getLocalDb().diagrams.delete(id);
}

export async function updateDiagramName(
  diagram: string | Diagram,
  newName: string
): Promise<boolean> {
  return !!(await getLocalDb().diagrams.update(diagram, { name: newName }));
}

export async function createEntity(data: {
  name: string;
  x?: number;
  y?: number;
}) {
  const now = new Date();
  return await getLocalDb().entities.add({
    name: data.name,
    x: data.x ?? 0,
    y: data.y ?? 0,
    createdAt: now,
    updatedAt: now,
  });
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
    type: string;
    isUnique?: boolean;
    isPrimary?: boolean;
    isNotNull?: boolean;
  },
  entity: { id: number } | number
) {
  const now = new Date();
  return await getLocalDb().fields.add({
    name: data.name,
    entityId: entity instanceof Object ? entity.id : entity,
    type: data.type,
    isUnique: data.isUnique ?? false,
    isNotNull: data.isNotNull ?? false,
    isPrimaryKey: data.isPrimary ?? false,
    createdAt: now,
    updatedAt: now,
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
  return !!await getLocalDb().entities.update(entity, {
    x: position.x,
    y: position.y,
  });
}
