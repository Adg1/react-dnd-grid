import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "../store/data";
import { DragItem, DropAction } from "../definitions";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: cyan;
  color: black;
  margin: 10px;
`;

const Tool = ({
  id,
  width,
}: {
  id: string;
  width: number;
  height?: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    null,
    {
      isDragging: boolean;
    }
  >({
    type: ItemTypes.CARD,
    item: () => {
      return { width, type: DropAction.ADD };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <Box
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {id} - {width}
    </Box>
  );
};

export const Toolbox = () => {
  return (
    <Container>
      {arr.map((item) => {
        return <Tool key={item.id} id={item.id} width={item.width} />;
      })}
    </Container>
  );
};

const now = Date.now();
const arr = [
  {
    id: (now + 1).toString().substring(5),
    width: 4,
  },
  {
    id: (now + 2).toString().substring(5),
    width: 8,
  },
  {
    id: (now + 3).toString().substring(5),
    width: 12,
  },
  {
    id: (now + 4).toString().substring(5),
    width: 6,
  },
  {
    id: (now + 5).toString().substring(5),
    width: 3,
  },
  {
    id: (now + 6).toString().substring(5),
    width: 7,
  },
  {
    id: (now + 7).toString().substring(5),
    width: 3,
  },
  {
    id: (now + 8).toString().substring(5),
    width: 12,
  },
  {
    id: (now + 9).toString().substring(5),
    width: 4,
  },
];
