import { Field } from "./Field";
import { FieldType } from "./types";

import styled from "styled-components";
import { getFieldsWithFiller } from "./utils";
import { DropArea } from "./GridItem";

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
