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
