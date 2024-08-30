import { useZoom } from "../../hooks/useZoom";
import { useCanvas } from "../../hooks/useCanvas";

import "./style.scss";

export const ZoomButtons = () => {
  const { zoomIn, zoomOut } = useZoom();
  const { currentZoom } = useCanvas();
  return (
    <div className="zoom">
      <div className="zoom__buttons">
        <button className="zoom__button" onClick={zoomIn}>
          +
        </button>
        <button className="zoom__button" onClick={zoomOut}>
          -
        </button>
      </div>

      <span className="zoom__info">{(currentZoom * 100).toFixed(1)}%</span>
    </div>
  );
};
