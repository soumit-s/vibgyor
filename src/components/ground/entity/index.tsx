"use client";
import { useEntity, useEntityFields } from "@/lib/hooks";
import { getEntityById } from "@/lib/util";
import Konva from "konva";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { Line, Rect, Text, Group } from "react-konva";

interface Props {
  entityId: number;
}

interface EntityTheme {
  paddingX: number;
  paddingY: number;
  fontFamily: string;
  fontSize: number;
  entityNameColor: string;
  fieldColor: string;
}

const Entity = ({ entityId }: Props) => {
  const entity = useEntity(entityId);
  const entityFields = useEntityFields(entityId);

  // Reference to the entity name element.
  const groupRef: ComponentProps<typeof Group>["ref"] = useRef(null);

  const theme: EntityTheme = {
    paddingX: 5,
    paddingY: 5,
    fontFamily: "Fira Code",
    fontSize: 14,
    entityNameColor: "#b6c9c2",
    fieldColor: "#b6c9c2",
  };

  useEffect(() => {
    if (groupRef.current && entity) {
      const entityWidth = 200;
      const group = groupRef.current;

      const nameEl = new Konva.Text({
        text: entity?.name,
        fill: theme.entityNameColor,
        x: 10,
        y: 10,
        fontFamily: theme.fontFamily,
        fontSize: theme.fontSize,
      });

      const entityNameRect = new Konva.Rect({
        width: entityWidth,
        height: nameEl.getHeight() + 2 * 10,
        fill: "#212b26", //"#0b0f0d",
        cornerRadius: [8, 8, 0, 0],
        stroke: "#212b26",
        strokeWidth: 2,
      });

      const fieldsRect = new Konva.Rect({
        x: 0,
        y: nameEl.getHeight() + 2 * 10,
        width: entityWidth,
        height: 120,
        stroke: "#212b26",
        fill: "#0b0f0d",
        cornerRadius: [0, 0, 10, 10],
      });

      let fieldY = fieldsRect.getPosition().y + 5;
      let maxFieldWidth = entityWidth;
      const elements = entityFields
        .map((field) => {
          const fieldName = new Konva.Text({
            x: 10,
            y: fieldY + 5,
            text: field.name,
            fill: theme.fieldColor,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSize,
          });
          const fieldType = new Konva.Text({
            x: fieldName.getPosition().x + fieldName.getWidth() + 10,
            y: fieldY + 5,
            text: field.type,
            fill: theme.fieldColor,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSize,
          });
          fieldY += 2 * 5 + fieldName.getHeight();
          const finalWidth =
            fieldType.getPosition().x + fieldType.getWidth() + 10; // +10 for padding.
          maxFieldWidth =
            maxFieldWidth < finalWidth ? finalWidth : maxFieldWidth;
          return { fieldName, fieldType };
        })
        .map(({ fieldName, fieldType }) => {
          const fieldGroup = new Konva.Group({ x: 0, fieldY });

          // Left align the field type.
          fieldType.setPosition({
            x: maxFieldWidth - 10 - fieldType.getWidth(),
            y: fieldType.getPosition().y,
          });

          fieldGroup.add(fieldName, fieldType);
          return fieldGroup;
        });

      // Set the height of the field rect using the final value of
      // fieldY. Also, takes into account the padding.
      fieldsRect.setSize({
        width: entityWidth,
        height: fieldY - fieldsRect.getPosition().y + 5,
      });

      group.add(entityNameRect);
      group.add(nameEl);
      group.add(fieldsRect);
      group.add(...elements);
      // group.add(nameFieldDivider);

      return () => {
        group.removeChildren();
      };
    }
  }, [groupRef, entity, entityFields]);

  return entity && <Group x={entity.x} y={entity.y} ref={groupRef}></Group>;
};

export default Entity;
