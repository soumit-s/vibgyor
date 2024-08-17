"use client";
import { Field } from "@/lib/db";
import { useEntity, useEntityFields } from "@/lib/hooks";
import { updateEntityPosition } from "@/lib/util";
import Konva from "konva";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Group } from "react-konva";

interface Props {
  entityId: number;
  onMouseOver?(e: Konva.KonvaEventObject<MouseEvent>): void;
  onMouseEnter?(e: Konva.KonvaEventObject<MouseEvent>): void;
  onMouseLeave?(e: Konva.KonvaEventObject<MouseEvent>): void;
}

interface EntityTheme {
  paddingX: number;
  paddingY: number;
  fontFamily: string;
  fontSize: number;
  entityNameColor: string;
  fieldColor: string;
}

const Entity = ({ entityId, ...props }: Props) => {
  const entityWidth = 200;
  const entity = useEntity(entityId);
  const entityFields = useEntityFields(entityId);

  const theme: EntityTheme = {
    paddingX: 5,
    paddingY: 5,
    fontFamily: "Fira Code",
    fontSize: 14,
    entityNameColor: "#b6c9c2",
    fieldColor: "#b6c9c2",
  };

  type Fg = { grp: Konva.Group; name: Konva.Text; type: Konva.Text };

  const createEntityNameElements = () => {
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

    return { text: nameEl, rect: entityNameRect };
  };

  function createFieldsSection() {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: entityWidth,
      height: 120,
      stroke: "#212b26",
      fill: "#0b0f0d",
      cornerRadius: [0, 0, 10, 10],
    });
    const grp = new Konva.Group();
    grp.add(rect);
    return { grp, rect };
  }

  function createNewFieldGroup(fieldY: number): Fg {
    const name = new Konva.Text({
      x: 10,
      y: 5,
      text: "",
      fill: theme.fieldColor,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
    });
    const type = new Konva.Text({
      x: name.getPosition().x + name.getWidth() + 10,
      y: 5,
      text: "",
      fill: theme.fieldColor,
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
    });
    const grp = new Konva.Group({ x: 0, y: fieldY });
    grp.add(name, type);
    return { grp, name, type };
  }

  function updateFieldGroup(fg: Fg, field: Field) {
    fg.name.setText(field.name);
    fg.type.setText(field.type);
  }

  const self = useRef({
    entityNameElements: createEntityNameElements(),
    fieldsSection: createFieldsSection(),
    fieldGroups: [] as Fg[],
  });

  const groupRef = useCallback((group: Konva.Group) => {
    if (group) {
      group.add(self.current.entityNameElements.rect);
      group.add(self.current.entityNameElements.text);
      group.add(self.current.fieldsSection.grp);
    }
  }, []);

  useEffect(() => {
    // Update entity name if there is any changes in the entity name.
    const { entityNameElements, fieldsSection } = self.current;
    if (!entity) return;
    if (entity.name != (entityNameElements.text.text as unknown as string))
      entityNameElements.text.setText(entity.name);
    fieldsSection.grp.setPosition({
      x: 0,
      y: entityNameElements.rect.getSize().height,
    });
  }, [entity]);

  useEffect(() => {
    if (!entity) {
      return;
    }
    const { fieldGroups, fieldsSection } = self.current;
    let fieldY = 5;
    let maxFieldWidth = entityWidth;

    entityFields.forEach((field, idx) => {
      const fg =
        fieldGroups.length > idx
          ? fieldGroups[idx]
          : createNewFieldGroup(fieldY);

      if (fieldGroups.length <= idx) {
        fieldGroups.push(fg);
        fieldsSection.grp.add(fg.grp);
      }

      updateFieldGroup(fg, field);
      fieldY += 2 * 5 + fg.name.getHeight();
      
      // + 40 for total x-padding 
      const finalWidth = fg.name.getWidth() + fg.type.getWidth() + 40;
      maxFieldWidth = maxFieldWidth < finalWidth ? finalWidth : maxFieldWidth;
    });

    for (const fg of fieldGroups) {
      // Left align the field type.
      fg.type.setPosition({
        x: maxFieldWidth - 10 - fg.type.getWidth(),
        y: fg.type.getPosition().y,
      });
    }

    for (let i = 0; i < fieldGroups.length; ++i) {
      if (i < entityFields.length) {
        fieldGroups[i].grp.show();
      } else {
        fieldGroups[i].grp.hide();
      }
    }

    // Set the height of the field rect using the final value of
    // fieldY. Also, takes into account the padding.
    fieldsSection.rect.setSize({
      width: entityWidth,
      height: fieldY + 5,
    });
  }, [entityFields]);

  return (
    entity && (
      <Group
        x={entity.x}
        y={entity.y}
        ref={groupRef}
        draggable
        onMouseEnter={props.onMouseEnter}
        onMouseOver={(e) => {
          const stage = e.currentTarget.getStage();
          if (stage) {
            stage.container().style.cursor = "pointer";
          }
          props.onMouseOver && props.onMouseOver(e);
        }}
        onMouseLeave={(e) => {
          const stage = e.currentTarget.getStage();
          if (stage) {
            stage.container().style.cursor = "default";
          }
          props.onMouseLeave && props.onMouseLeave(e);
        }}
        onDragEnd={(e) => {
          updateEntityPosition(entity, e.currentTarget.getPosition());
        }}
      ></Group>
    )
  );
};

export default Entity;
