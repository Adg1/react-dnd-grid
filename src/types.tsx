import { XYCoord } from "react-dnd";

export interface FieldType {
  id: number;
  name: string;
  description: string;
  width: number;
  items?: FieldType[];
  height?: number;
}

export interface DragItem {
  index: number;
  id: number;
  type: string;
  hoverProps?: {
    lastTargetId: number;
    lastClientOffset: XYCoord;
    lastDirection?: number;
    lastTime?: number;
  };
}
