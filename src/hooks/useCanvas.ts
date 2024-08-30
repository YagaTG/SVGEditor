import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";

export const useCanvas = () => {
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext) throw new Error("Canvas don't load");
  return canvasContext;
};
