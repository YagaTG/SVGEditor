import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { MyCanvas, CanvasState } from "../types/CanvasType";
import * as fabric from "fabric";

type CanvasContextType = {
  currentZoom: number;
  setCurrentZoom: React.Dispatch<React.SetStateAction<number>>;
  canvas: MyCanvas;
  setCanvas: React.Dispatch<React.SetStateAction<MyCanvas>>;
  historyChanges: CanvasState[];
  setHistoryChanges: React.Dispatch<React.SetStateAction<CanvasState[]>>;
  historyRedo: CanvasState[];
  setHistoryRedo: React.Dispatch<React.SetStateAction<CanvasState[]>>;
  canvasState: CanvasState | undefined;
  setCanvasState: React.Dispatch<React.SetStateAction<CanvasState | undefined>>;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentZoom, setCurrentZoom] = useState<number>(1);
  const [canvas, setCanvas] = useState<MyCanvas>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>();
  const [historyChanges, setHistoryChanges] = useState<CanvasState[]>([]);
  const [historyRedo, setHistoryRedo] = useState<CanvasState[]>([]);
  useEffect(() => {
    const isPrevState = historyChanges.filter(
      (state) =>
        JSON.stringify(state.objects) === JSON.stringify(canvasState?.objects)
    );
    // console.log("Уже встречный элемент:", isPrevState);

    if ((canvasState && isPrevState.length == 0) || canvasState?.isDeleted) {
      // console.log("New Object!");
      setHistoryRedo([]); // History Redo
      setHistoryChanges([...historyChanges, { ...canvasState }]); // History Undo

      // console.log("Новая актуальная истории ДО", [
      //   ...historyChanges,
      //   { ...canvasState },
      // ]);
      // console.log("Новая актуальная история ПОСЛЕ", []);
    }
  }, [canvasState]);

  return (
    <CanvasContext.Provider
      value={{
        currentZoom,
        setCurrentZoom,
        canvas,
        setCanvas,
        historyChanges,
        setHistoryChanges,
        canvasState,
        setCanvasState,
        historyRedo,
        setHistoryRedo,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
