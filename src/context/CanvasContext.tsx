import { createContext, FC, PropsWithChildren, useState } from "react";
import { MyCanvas } from "../types/CanvasType";

type CanvasContextType = {
  currentZoom: number;
  setCurrentZoom: React.Dispatch<React.SetStateAction<number>>;
  canvas: MyCanvas;
  setCanvas: React.Dispatch<React.SetStateAction<MyCanvas>>;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
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
