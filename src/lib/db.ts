import { Dexie, EntityTable } from "dexie";

export interface Timestamps {
  updatedAt: Date;
  createdAt: Date;
}

export interface Diagram extends Timestamps {
  id: string;
  name: string;
  code: string;
}

export interface Entity extends Timestamps {
  id: number;
  diagramId: string;
  name: string;
  x: number;
  y: number;
}

const entitySchema = `
  ++id,
  diagramId, 
  name, 
  x,
  y,
  updatedAt, 
  createdAt
`;

export interface Field {
  entityId: number;
  name: string;
  idx: number;
  type: string;
  isPrimaryKey: boolean;
  isNotNull: boolean;
  isUnique: boolean;
}

const fieldSchema = `
  [entityId+name],
  idx,
  type, 
  isPrimaryKey, 
  isNotNull, 
  isUnique
`;

export interface Relations extends Timestamps {
  id: number;
  type: "one-to-one" | "one-to-many" | "many-to-many";
  from: number; // Id of some Field object.
  to: number; // Id of some Field object.
}

export type Database = Dexie & {
  diagrams: EntityTable<Diagram, "id">;
  entities: EntityTable<Entity, "id">;
  fields: EntityTable<Field>;
  relations: EntityTable<Relations, "id">;
};

// Dexie.delete("local-db"); 

const db = new Dexie("local-db") as Database;

db.version(1).stores({
  diagrams: "++id, name, code, updatedAt, createdAt",
  entities: entitySchema,
  fields: fieldSchema,
  relations: "++id, type, updatedAt, createdAt",
});

export const getLocalDb = () => db;
