import { BaseTree } from "./BaseTree";

export interface FieldType extends BaseTree<FieldType> {
  name: string;
  description: string;
  width: number;
  height?: number;
}

export enum DropAction {
  ADD,
  MOVE,
}
export type DragItem =
  | {
      type: DropAction.MOVE;
      id: string;
      width: number;
    }
  | {
      type: DropAction.ADD;
      width: number;
    };

export type FillerFields = Array<FieldOrFiller>;

export type FieldOrFiller =
  | {
      type: "field";
      id: string;
      width: number;
      targetIndex: number;
      field: FieldType;
    }
  | {
      type: "filler";
      id: string;
      width: number;
      targetIndex: number;
      filler: Filler;
    };

export type Filler = {
  width: number;
  height: number;
};

export interface FieldWithParentId extends FieldType {
  parentId: string;
}
