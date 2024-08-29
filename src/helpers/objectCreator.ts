import * as fabric from "fabric";
import { MyCanvas } from "../types/CanvasType";

export const addRect = (canvas: MyCanvas) => {
  if (canvas) {
    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: "red",
      width: 40,
      height: 40,
    });
    canvas.add(rect);
  }
};

export const addCircle = (canvas: MyCanvas) => {
  if (canvas) {
    const circle = new fabric.Circle({
      left: 0,
      top: 0,
      radius: 20,
      fill: "red",
    });
    canvas.add(circle);
  }
};

export const addTriangle = (canvas: MyCanvas) => {
  if (canvas) {
    const triangle = new fabric.Triangle({
      left: 0,
      top: 0,
      fill: "red",
      width: 40,
      height: 40,
    });
    canvas.add(triangle);
  }
};

export const addLine = (canvas: MyCanvas) => {
  if (canvas) {
    const line = new fabric.Line([50, 0, 0, 0], {
      left: 10,
      top: 10,
      stroke: "red",
    });

    canvas.add(line);
  }
};

export const addText = (canvas: MyCanvas) => {
  if (canvas) {
    const text = new fabric.Text("hello world", { left: 100, top: 100 });
    canvas.add(text);
  }
};
