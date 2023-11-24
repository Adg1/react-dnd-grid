import styled from "styled-components";
import { DragItem, FieldType } from "./types";
import { Grid } from "./Grid";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./data";
import React from "react";
import { Identifier } from "dnd-core";
import { useFieldsStore } from "./store";

const SGridItem = styled.div<{
  $width: number;
  $height?: number;
  $dragging: boolean;
}>`
  flex: 0 0 ${(props) => (props.$width / 12) * 100}%;
  height: ${(props) => (props.$height ? props.$height * 60 + "px" : "auto")};
  border: 2px solid black;
  border-color: ${(props) => (props.$dragging ? "pink" : "black")};
  background-color: cyan;
  color: black;
`;

export const Field = ({
  field,
  index,
  parentId,
}: {
  field: FieldType;
  index: number;
  parentId: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const moveField = useFieldsStore((state) => state.moveField);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: field.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    null,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (
        !ref.current ||
        item.id === field.id ||
        item.id === parentId ||
        !monitor.isOver({ shallow: true })
      ) {
        return;
      }

      if (item.hoverProps?.lastTargetId !== field.id) {
        item.hoverProps = {
          lastTargetId: field.id,
          lastClientOffset: monitor.getClientOffset()!,
        };
        return;
      }

      if (
        item.hoverProps?.lastTime &&
        Date.now() - item.hoverProps.lastTime < 100
      ) {
        return;
      }

      const { lastClientOffset } = item.hoverProps;
      const currentClientOffset = monitor.getClientOffset()!;
      const yDirection = currentClientOffset.y - lastClientOffset.y;
      const xDirection = currentClientOffset.x - lastClientOffset.x;

      const direction =
        Math.abs(yDirection) > Math.abs(xDirection) ? yDirection : xDirection;

      if (direction === 0 || direction === item.hoverProps.lastDirection) {
        return;
      }

      if (yDirection > 0) {
        moveField(item.id, parentId, field.id, true);
        item.index = index + 1;
        item.hoverProps.lastClientOffset = currentClientOffset;
      } else {
        moveField(item.id, parentId, field.id, false);
        item.index = index;
        item.hoverProps.lastClientOffset = currentClientOffset;
      }
      item.hoverProps.lastTime = Date.now();
      item.hoverProps.lastDirection = direction;
      return;
    },
  });

  drag(drop(ref));
  return (
    <SGridItem
      key={field.id}
      $width={field.width}
      $height={field.height}
      $dragging={isDragging}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div>{field.name}</div>
      {field.items && (
        <DummyDropArea fields={field.items} parentId={field.id}>
          <Grid data={field.items} parentId={field.id} />
        </DummyDropArea>
      )}
    </SGridItem>
  );
};

const DummyDropArea = ({
  children,
  fields,
  parentId,
}: {
  children: React.ReactNode;
  fields: FieldType[];
  parentId: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const moveFieldToParent = useFieldsStore((state) => state.moveFieldToParent);
  const getParentId = useFieldsStore((state) => state.getParentId);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    null,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current || !monitor.isOver({ shallow: true })) {
        return;
      }

      if (fields.length && getParentId(item.id) === parentId) {
        return;
      }
      console.log(getParentId(item.id), parentId);
      moveFieldToParent(item.id, parentId);
    },
  });
  drop(ref);
  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </div>
  );
};
