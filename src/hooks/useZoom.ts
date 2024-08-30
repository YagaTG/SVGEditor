import { useCanvas } from "./useCanvas";

export const useZoom = () => {
  const { canvas, setCurrentZoom, currentZoom } = useCanvas();

  const zoomIn = () => {
    if (canvas) {
      const zoom = canvas.getZoom() + 25 / 100;
      canvas.setZoom(zoom);
      setCurrentZoom(zoom);
      canvas.requestRenderAll();
    }
  };

  const zoomOut = () => {
    if (canvas && currentZoom > 0) {
      const zoom = canvas.getZoom() - 25 / 100;
      canvas.setZoom(zoom);
      setCurrentZoom(zoom);
      canvas.requestRenderAll();
    }
  };

  return { zoomIn, zoomOut };
};
