import React from "react";
import { useDrop } from "react-dnd";
import { DragItem } from "../definitions";
import { Identifier } from "dnd-core";
import { ItemTypes } from "../store/data";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: yellow;
  row-gap: 30px;
`;

export const DummyDropArea = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
  });
  drop(ref);
  return (
    <Container
      ref={ref}
      data-handler-id={handlerId}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </Container>
  );
};
