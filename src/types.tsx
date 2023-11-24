export interface FieldType {
  id: string;
  name: string;
  description: string;
  width: number;
  items?: FieldType[];
  height?: number;
}

export interface DragItem {
  id: string;
  width: number;
  type: string;
}

export type FillerFields = Array<FieldOrFiller>;

export type FieldOrFiller =
  | {
      type: "field";
      id: string;
      width: number;
      field: FieldType;
    }
  | {
      type: "filler";
      id: string;
      width: number;
      filler: Filler;
    };

export type Filler = {
  fieldId: string;
  width: number;
  height: number;
};
