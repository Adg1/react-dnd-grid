import { useDrop } from "react-dnd";
import { useFieldsStore } from "../store/store";
import { DragItem, DropAction, FieldOrFiller } from "../definitions";
import { Identifier } from "dnd-core";
import { ItemTypes } from "../store/data";
import styled from "styled-components";

const SGridItem = styled.div<{
  $width: number;
}>`
  flex: 0 0 ${(props) => (props.$width / 12) * 100}%;
  background-color: transparent;
  color: black;
  min-height: 60px;
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
  const moveField = useFieldsStore((state) => state.moveFieldNew);
  const addField = useFieldsStore((state) => state.addField);
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
        (dragItem.type === DropAction.MOVE && item.id === dragItem.id) ||
        // (item.type === "filler" && dragItem.width > item.width) ||
        !monitor.isOver({ shallow: true })
      ) {
        return false;
      }
      return true;
    },
    drop(dragItem) {
      if (dragItem.type === DropAction.MOVE) {
        const { id: draggedId } = dragItem;
        moveField(draggedId, parentId, item.targetIndex);
      } else if (dragItem.type === DropAction.ADD) {
        const { width } = dragItem;
        addField(parentId, item.targetIndex, width);
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
        backgroundColor: isOver ? (canDrop ? "green" : "red") : "transparent",
        opacity: canDrop ? 0.5 : 1,
      }}
    >
      {children}
    </SGridItem>
  );
};
