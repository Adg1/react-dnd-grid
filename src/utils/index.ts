import { FieldType, FieldWithParentId, FillerFields } from "../definitions";
import { DUMMY_ROOT_ID } from "../definitions/BaseTree";

export const getFieldsWithFiller = (fields: Array<FieldType>): FillerFields => {
  if (fields.length === 0) {
    return [
      {
        type: "filler",
        id: "-1",
        width: 12,
        targetIndex: 0,
        filler: {
          width: 12,
          height: 1,
        },
      },
    ];
  }
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
      targetIndex: i,
    });
    currentWidth += field.width;

    if (i === fields.length - 1) {
      fieldsWithFiller.push({
        type: "filler",
        id: `${field.id}-filler`,
        width: 12 - currentWidth,
        targetIndex: i + 1,
        filler: {
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
        targetIndex: i + 1,
        filler: {
          width: fillerWidth,
          height: 1,
        },
      });
      currentWidth = 0;
    }
  }

  return fieldsWithFiller;
};

export const getFieldsWithParentId = (
  fields: Array<FieldType>,
  parentId = DUMMY_ROOT_ID
): Array<FieldWithParentId> => {
  const fieldsWithParentId: Array<FieldWithParentId> = [];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.items) {
      field.items = getFieldsWithParentId(field.items, field.id);
    }
    fieldsWithParentId.push({
      ...field,
      parentId,
    });
  }
  return fieldsWithParentId;
};

// find parent field by id(recursively)
export const findParentField = (
  fields: Array<FieldType>,
  id: string
): FieldType | null => {
  const fieldsWithParentId = getFieldsWithParentId(fields);
  // search recursively
  for (let i = 0; i < fieldsWithParentId.length; i++) {
    if (fieldsWithParentId[i].id === id) {
      return fieldsWithParentId[i];
    }
    if (fieldsWithParentId[i].items) {
      const f = findParentField(fieldsWithParentId[i].items!, id);
      if (f) return f;
    }
  }
  return null;
};

//find field by id(recursively)
export const findField = <T extends FieldType>(
  fields: Array<T>,
  id: string
): T | null => {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id === id) {
      return fields[i];
    }
    if (fields[i].items) {
      const f = findField(fields[i].items! as Array<T>, id);
      if (f) return f;
    }
  }
  return null;
};

// remove and return field from fields(recursively)
export const removeField = (fields: Array<FieldType>, id: string) => {
  const newFields = fields.filter((f) => {
    if (f.id === id) {
      return false;
    }
    if (f.items) {
      f.items = removeField(f.items, id);
    }
    return true;
  });
  return newFields;
};
