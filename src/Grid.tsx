import { Field } from "./Field";
import { FieldType } from "./types";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: yellow;
  row-gap: 30px;
`;

export const Grid = ({
  parentId,
  data,
}: {
  data: Array<FieldType>;
  parentId: number;
}) => {
  return (
    <Container>
      {data.map((item, i) => {
        return (
          <Field key={item.id} field={item} index={i} parentId={parentId} />
        );
      })}
    </Container>
  );
};
