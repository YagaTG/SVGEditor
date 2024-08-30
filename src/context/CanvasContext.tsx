import { createContext, FC, PropsWithChildren, useState } from "react";
import { MyCanvas } from "../types/CanvasType";
import * as fabric from "fabric";

type CanvasContextType = {
  currentZoom: number;
  setCurrentZoom: React.Dispatch<React.SetStateAction<number>>;
  canvas: MyCanvas;
  setCanvas: React.Dispatch<React.SetStateAction<MyCanvas>>;
  selectedObjects: fabric.FabricObject[];
  setSelectedObjects: React.Dispatch<
    React.SetStateAction<fabric.FabricObject[]>
  >;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentZoom, setCurrentZoom] = useState<number>(1);
  const [canvas, setCanvas] = useState<MyCanvas>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.FabricObject[]>(
    []
  );

  return (
    <CanvasContext.Provider
      value={{
        currentZoom,
        setCurrentZoom,
        canvas,
        setCanvas,
        selectedObjects,
        setSelectedObjects,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
