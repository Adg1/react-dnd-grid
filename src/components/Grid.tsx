import { Field } from "./Field";
import { FieldType } from "../definitions";

import { getFieldsWithFiller } from "../utils";
import { DropArea } from "./GridItem";
import { DummyDropArea } from "./DummyDropArea";

export const Grid = ({
  parentId,
  data,
}: {
  data: Array<FieldType>;
  parentId: string;
}) => {
  const fieldsWithFiller = getFieldsWithFiller(data);
  return (
    <DummyDropArea>
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
    </DummyDropArea>
  );
};
