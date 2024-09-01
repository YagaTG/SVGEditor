import { useCanvas } from "./useCanvas";

export const useZoom = () => {
  const { canvas, setCurrentZoom } = useCanvas();

  const zoomIn = () => {
    if (canvas) {
      const zoom = canvas.getZoom() + 25 / 100;
      canvas.setZoom(zoom);
      setCurrentZoom(zoom);
      canvas.requestRenderAll();
    }
  };

  const zoomOut = () => {
    if (canvas) {
      let zoom = canvas.getZoom() - 25 / 100;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      setCurrentZoom(zoom);
      canvas.requestRenderAll();
    }
  };

  return { zoomIn, zoomOut };
};
