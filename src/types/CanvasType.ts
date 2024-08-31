import * as fabric from "fabric";

export type MyCanvas = null | fabric.Canvas;
export type CanvasState = {
  version: string;
  objects: [];
  ind: number;
  isDeleted?: boolean;
};
