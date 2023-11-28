import { create } from "zustand";
import { fields } from "./data";
import { FieldType } from "../definitions";
import { findField, removeField } from "../utils";
import {
  findNode,
  findParent,
  insertNodeBefore,
  removeNode,
} from "../definitions/BaseForest";

interface FieldState {
  fields: Array<FieldType>;
  moveField: (
    sourceId: string,
    targetParentId: string,
    targetIndex: number
  ) => void;
  /**
   * @param sourceId
   * @param targetId
   * @returns void
   * @description move source field to target field by removing source field from its parent and inserting it after target field
   * if they are adjacent, exchange their positions
   * */
  moveFieldNew: (
    sourceId: string,
    targetParentId: string,
    targetIndex: number
  ) => void;
  addField: (parentId: string, targetIndex: number, width: number) => void;
}

export const useFieldsStore = create<FieldState>((set) => ({
  fields: fields,
  moveField: (
    sourceId: string,
    targetParentId: string,
    targetIndex: number
  ) => {
    set((state) => {
      // get target index in parent field
      if (targetIndex === -1) return state;
      // get source field
      const sourceField = findField(state.fields, sourceId);
      if (!sourceField) return state;
      // remove source field from fields
      const newFields = removeField(state.fields, sourceId);
      // insert source field to target index
      const newTargetParentField = findField(newFields, targetParentId);
      const newTargetFields = newTargetParentField?.items || newFields;
      newTargetFields.splice(targetIndex, 0, sourceField);
      // update fields
      return {
        ...state,
        fields: newFields,
      };
    });
  },
  moveFieldNew: (
    sourceId: string,
    targetParentId: string,
    targetIndex: number
  ) => {
    set((state) => {
      // get target index in parent field
      if (targetIndex === -1) return state;
      const targetParent = findNode(state.fields, targetParentId);
      if (!targetParent) return state;

      const sourceField = findNode(state.fields, sourceId);
      const targetField = targetParent.items![targetIndex];
      if (!sourceField || !targetField || sourceField.id === targetField.id)
        return state;
      const sourceParent = findParent(state.fields, sourceField.id);
      if (!sourceParent) return state;
      if (sourceParent.id === targetParent.id) {
        // exchange their positions
        const newFields = [...state.fields];
        const newParent = findNode(newFields, sourceParent.id);
        const sourceIndex = newParent?.items?.findIndex(
          (f) => f.id === sourceId
        );
        if (sourceIndex === undefined) return state;
        if (!newParent) return state;
        if (Math.abs(sourceIndex - targetIndex) === 1) {
          // exchange positions
          const tmp = newParent.items![sourceIndex];
          newParent.items![sourceIndex] = newParent.items![targetIndex];
          newParent.items![targetIndex] = tmp;
          return {
            ...state,
            fields: newFields,
          };
        }
      }
      // remove source field from fields
      const { forest } = removeNode(state.fields, sourceId);
      // insert source field to target index
      const newFields = insertNodeBefore(forest!, targetField.id, sourceField);
      if (!newFields) return state;
      return {
        ...state,
        fields: newFields,
      };
    });
  },
  addField(parentId, targetIndex, width) {
    set((state) => {
      // get parent field
      const parentField = findField(state.fields, parentId);
      // create new field
      const newField: FieldType = {
        id: Math.random().toString(36).substr(2, 9),
        name: "New Field",
        description: "New Field",
        width: width,
      };
      // insert new field to target index
      const newTargetFields = parentField?.items || state.fields;
      newTargetFields.splice(targetIndex, 0, newField);
      // update fields
      return {
        ...state,
        fields: [...newTargetFields],
      };
    });
  },
}));
