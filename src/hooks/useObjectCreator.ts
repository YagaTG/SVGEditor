import * as fabric from "fabric";
import { MyCanvas } from "../types/CanvasType";
import { useCanvas } from "./useCanvas";

export const useObjectCreator = () => {
  const { selectedObjects, setSelectedObjects } = useCanvas();
  const addRect = (canvas: MyCanvas) => {
    if (canvas) {
      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: "red",
        width: 40,
        height: 40,
      });
      rect.on("selected", () => {
        setSelectedObjects([...selectedObjects, rect]);
      });
      rect.fill = "black";
      canvas.add(rect);
    }
  };

  const addCircle = (canvas: MyCanvas) => {
    if (canvas) {
      const circle = new fabric.Circle({
        left: 0,
        top: 0,
        radius: 20,
        fill: "red",
      });
      circle.on("selected", () => {
        setSelectedObjects([...selectedObjects, circle]);
      });

      canvas.add(circle);
    }
  };

  const addTriangle = (canvas: MyCanvas) => {
    if (canvas) {
      const triangle = new fabric.Triangle({
        left: 0,
        top: 0,
        fill: "red",
        width: 40,
        height: 40,
      });
      triangle.on("selected", () => {
        setSelectedObjects([...selectedObjects, triangle]);
      });
      canvas.add(triangle);
    }
  };

  const addLine = (canvas: MyCanvas) => {
    if (canvas) {
      const line = new fabric.Line([50, 0, 0, 0], {
        left: 10,
        top: 10,
        stroke: "red",
      });
      line.on("selected", () => {
        setSelectedObjects([...selectedObjects, line]);
      });
      canvas.add(line);
    }
  };

  const addText = (canvas: MyCanvas) => {
    if (canvas) {
      const text = new fabric.Textbox("hello world", { left: 100, top: 100 });
      text.on("selected", () => {
        setSelectedObjects([...selectedObjects, text]);
      });
      canvas.add(text);
    }
  };

  const addImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    canvas: MyCanvas
  ) => {
    if (canvas && e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const image = new Image();
          if (
            e.target &&
            e.target.result &&
            typeof e.target.result === "string"
          )
            image.src = e.target.result;
          image.onload = function () {
            const img = new fabric.Image(image);
            img.set({
              left: 100,
              top: 60,
            });
            img.scaleToWidth(140);
            canvas.add(img);
            canvas.renderAll();
          };
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return { addCircle, addRect, addLine, addTriangle, addText, addImage };
};
