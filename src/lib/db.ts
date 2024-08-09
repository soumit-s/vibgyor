import { Dexie, EntityTable } from "dexie";

export interface Timestamps {
  updatedAt: Date;
  createdAt: Date;
}

export interface Diagram extends Timestamps {
  id: string;
  name: string;
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

export interface Field extends Timestamps {
  id: number;
  entityId: number;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isNotNull: boolean;
  isUnique: boolean;
}

const fieldSchema = `
  ++id, 
  name, 
  entityId, 
  type, 
  isPrimaryKey, 
  isNotNull, 
  isUnique, 
  updatedAt, 
  createdAt
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
  fields: EntityTable<Field, "id">;
  relations: EntityTable<Field, "id">;
};

Dexie.delete("local-db");

const db = new Dexie("local-db") as Database;

db.version(1).stores({
  diagrams: "++id, name, updatedAt, createdAt",
  entities: entitySchema,
  fields: fieldSchema,
  relations: "++id, type, updatedAt, createdAt",
});

export const getLocalDb = () => db;
