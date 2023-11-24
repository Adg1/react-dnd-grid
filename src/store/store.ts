import { create } from "zustand";
import { fields } from "./data";
import { FieldType } from "../definitions";

interface FieldState {
  fields: Array<FieldType>;
  moveField: (
    sourceId: string,
    targetParentId: string,
    targetId: string,
    after: boolean
  ) => void;
  moveFieldToParent: (sourceId: string, targetParentId: string) => void;
  getParentId: (id: string) => string;
}

export const useFieldsStore = create<FieldState>((set, get) => ({
  fields: fields,
  moveField: (
    sourceId: string,
    targetParentId: string,
    targetId: string,
    after: boolean
  ) => {
    set((state) => {
      const sourceField = findField(state.fields, sourceId);
      if (!sourceField) return state;
      const newFields = removeField(state.fields, sourceId);
      return {
        fields: addField(
          newFields,
          targetParentId,
          sourceField,
          targetId,
          after
        ),
      };
    });
  },
  moveFieldToParent: (sourceId: string, targetParentId: string) => {
    set((state) => {
      const sourceField = findField(state.fields, sourceId);
      if (!sourceField) return state;
      const newFields = removeField(state.fields, sourceId);
      return {
        fields: addField(newFields, targetParentId, sourceField, "-1", true),
      };
    });
  },
  getParentId: (id: string) => {
    const { fields } = get();
    const field = findParentField(fields, id);
    if (!field) return "-1";
    return field.id;
  },
}));

//find field by id(recursively)
const findField = (fields: Array<FieldType>, id: string): FieldType | null => {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id === id) {
      return fields[i];
    }
    if (fields[i].items) {
      const f = findField(fields[i].items!, id);
      if (f) return f;
    }
  }
  return null;
};

// remove and return field from fields(recursively)
const removeField = (fields: Array<FieldType>, id: string) => {
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

// add field to fields(recursively)

const addField = (
  fields: Array<FieldType>,
  parentId: string,
  field: FieldType,
  targetId: string,
  after: boolean
) => {
  if (parentId === "-1") {
    fields = [
      {
        id: "-1",
        items: fields,
      },
    ] as Array<FieldType>;
  }

  const newFields = fields.map((f) => {
    if (f.id === parentId) {
      if (f.items && targetId !== "-1") {
        const next = after ? 1 : 0;
        const targetIndex = f.items.findIndex((f) => f.id === targetId);
        f.items.splice(targetIndex + next, 0, field);
      } else {
        f.items = f.items || [];
        f.items.push(field);
      }
    } else if (f.items) {
      f.items = addField(f.items, parentId, field, targetId, after);
    }
    return f;
  });
  if (newFields?.[0]?.id === "-1") {
    return newFields[0].items!;
  }
  return newFields;
};

// find parent field by id(recursively)
const findParentField = (
  fields: Array<FieldType>,
  id: string
): FieldType | null => {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].items) {
      for (let j = 0; j < fields[i].items!.length; j++) {
        if (fields[i].items?.[j].id === id) {
          return fields[i];
        }
        if (fields[i].items![j].items) {
          const f = findParentField(fields[i].items![j].items!, id);
          if (f) return f;
        }
      }
    }
  }
  return null;
};
