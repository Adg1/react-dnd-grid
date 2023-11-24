import styled from "styled-components";
import { FieldType } from "../definitions";
import { Grid } from "./Grid";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../store/data";
import React from "react";

const FieldContainer = styled.div<{
  $height?: number;
  $dragging: boolean;
}>`
  width: 100%;
  height: ${(props) => (props.$height ? props.$height * 60 + "px" : "auto")};
  border: 2px solid black;
  border-color: ${(props) => (props.$dragging ? "pink" : "black")};
  background-color: cyan;
  color: black;
`;

export const Field = ({
  field,
  index,
}: {
  field: FieldType;
  index: number;
  parentId: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: field.id, index, width: field.width };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <FieldContainer
      key={field.id}
      $height={field.height}
      $dragging={isDragging}
      ref={ref}
    >
      <div>{field.name}</div>
      {field.items && <Grid data={field.items} parentId={field.id} />}
    </FieldContainer>
  );
};
