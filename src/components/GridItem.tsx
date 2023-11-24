import { useDrop } from "react-dnd";
import { useFieldsStore } from "../store/store";
import { DragItem, FieldOrFiller } from "../definitions";
import { Identifier } from "dnd-core";
import { ItemTypes } from "../store/data";
import styled from "styled-components";

const SGridItem = styled.div<{
  $width: number;
}>`
  flex: 0 0 ${(props) => (props.$width / 12) * 100}%;
  background-color: violet;
  color: black;
  /* padding: 0 10px; */
`;

export const DropArea = ({
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
