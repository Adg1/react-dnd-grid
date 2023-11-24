import { FieldType, FillerFields } from "./types";

export const getFieldsWithFiller = (fields: Array<FieldType>): FillerFields => {
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
    });
    currentWidth += field.width;

    if (i === fields.length - 1) {
      fieldsWithFiller.push({
        type: "filler",
        id: `${field.id}-filler`,
        width: 12 - currentWidth,
        filler: {
          fieldId: field.id,
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
        filler: {
          fieldId: field.id,
          width: fillerWidth,
          height: 1,
        },
      });
      currentWidth = 0;
    }
  }

  return fieldsWithFiller;
};
