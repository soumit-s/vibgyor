"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { getLocalDb } from "../db";

export const useDiagrams = () => {
  return useLiveQuery(() => getLocalDb().diagrams.toArray())?.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );
};

export const useDiagramById = (id: string) =>
  useLiveQuery(
    () => getLocalDb().diagrams.where("id").equals(id).first(),
    [id]
  );

export const useEntites = (diagramId: string) => {
  return useLiveQuery(
    () => getLocalDb().entities.where("diagramId").equals(diagramId).toArray(),
    [diagramId]
  );
};

export const useEntity = (entity: number | { id: number }) => {
  return useLiveQuery(
    () =>
      getLocalDb()
        .entities.where("id")
        .equals(entity instanceof Object ? entity.id : entity)
        .first(),
    [entity]
  );
};

export const useEntityFields = (entity: number | { id: number }) => {
  return useLiveQuery(
    () =>
      getLocalDb()
        .fields.where("entityId")
        .equals(entity instanceof Object ? entity.id : entity)
        .toArray(),
    [entity],
    []
  );
};
