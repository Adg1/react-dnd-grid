import { Identifier } from "dnd-core";
import { Field } from "./Field";
import { ItemTypes } from "./data";
import { DragItem, FieldType } from "./types";

import styled from "styled-components";
import { useDrop } from "react-dnd";
import { useFieldsStore } from "./store";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: yellow;
  row-gap: 30px;
`;

const SGridItem = styled.div<{
  $width: number;
}>`
  flex: 0 0 ${(props) => (props.$width / 12) * 100}%;
  background-color: violet;
  color: black;
  /* padding: 0 10px; */
`;

export const Grid = ({
  parentId,
  data,
}: {
  data: Array<FieldType>;
  parentId: string;
}) => {
  const fieldsWithFiller = getFieldsWithFiller(data);
  return (
    <Container>
      {fieldsWithFiller.map((item, i) => {
        return (
          <DropArea key={item.id} item={item} parentId={parentId}>
            {item.type === "field" && (
              <Field
                key={item.id}
                field={item.field}
                index={i}
                parentId={parentId}
              />
            )}
          </DropArea>
        );
      })}
    </Container>
  );
};

const DropArea = ({
  item,
  parentId,
  children,
}: {
  item: FieldOrFiller;
  parentId: string;
  children: React.ReactNode;
}) => {
  const moveField = useFieldsStore((state) => state.moveField);
  const [{ handlerId, canDrop, isOver }, drop] = useDrop<
    DragItem,
    null,
    { handlerId: Identifier | null; canDrop: boolean; isOver: boolean }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.isOver() && monitor.canDrop(),
      };
    },
    canDrop(dragItem, monitor) {
      if (
        item.id === dragItem.id ||
        !monitor.isOver({ shallow: true }) ||
        (item.type === "filler" && dragItem.width > item.width)
      ) {
        return false;
      }
      return true;
    },
    drop(dragItem) {
      const { id: droppedId } = item;
      const { id: draggedId } = dragItem;
      if (droppedId !== draggedId) {
        moveField(
          draggedId,
          parentId,
          item.type === "filler" ? item.filler.fieldId : item.field.id,
          item.type === "filler" ? true : false
        );
      }
      return undefined;
    },
  });
  return (
    <SGridItem
      key={item.id}
      $width={item.width}
      ref={drop}
      data-handler-id={handlerId}
      style={{
        backgroundColor: isOver ? (canDrop ? "green" : "red") : "violet",
        opacity: canDrop ? 0.5 : 1,
      }}
    >
      {children}
    </SGridItem>
  );
};

const getFieldsWithFiller = (fields: Array<FieldType>): FillerFields => {
  const fieldsWithFiller: FillerFields = [];
  let currentWidth = 0;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const fieldWidth = field.width;

    fieldsWithFiller.push({
      type: "field",
      field,
      id: field.id,
      width: fieldWidth,
    });
    currentWidth += field.width;

    if (i === fields.length - 1) {
      fieldsWithFiller.push({
        type: "filler",
        id: `${field.id}-filler`,
        width: 12 - currentWidth,
        filler: {
          fieldId: field.id,
          width: 12 - currentWidth,
          height: 1,
        },
      });
      break;
    }
    const nextField = fields[i + 1];
    const nextFieldWidth = nextField.width;
    if (currentWidth + nextFieldWidth > 12) {
      const fillerWidth = 12 - currentWidth;
      fieldsWithFiller.push({
        type: "filler",
        id: `${field.id}-filler`,
        width: fillerWidth,
        filler: {
          fieldId: field.id,
          width: fillerWidth,
          height: 1,
        },
      });
      currentWidth = 0;
    }
  }

  return fieldsWithFiller;
};

type FillerFields = Array<FieldOrFiller>;

type FieldOrFiller =
  | {
      type: "field";
      id: string;
      width: number;
      field: FieldType;
    }
  | {
      type: "filler";
      id: string;
      width: number;
      filler: Filler;
    };

type Filler = {
  fieldId: string;
  width: number;
  height: number;
};
