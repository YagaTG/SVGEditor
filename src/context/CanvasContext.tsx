import { createContext, useState } from "react";
import { MyCanvas } from "../types/CanvasType";

type CanvasContextType = {
  currentZoom: number;
  canvas: MyCanvas;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }) => {
  const [currentZoom, setCurrentZoom] = useState<number>(1);
  const [canvas, setCanvas] = useState<MyCanvas>(null);

  return (
    <CanvasContext.Provider
      value={{ currentZoom, setCurrentZoom, canvas, setCanvas }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
