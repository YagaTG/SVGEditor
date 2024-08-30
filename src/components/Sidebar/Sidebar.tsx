import {
  addCircle,
  addLine,
  addRect,
  addText,
  addTriangle,
} from "../../helpers/objectCreator";

import "./style.scss";
import { useCanvas } from "../../hooks/useCanvas";

export const Sidebar = () => {
  const { canvas } = useCanvas();
  return (
    <div className="sidebar">
      <button
        className="sidebar__button sidebar__button_rect"
        onClick={() => addRect(canvas)}
      >
        {""}
      </button>
      <button
        className="sidebar__button sidebar__button_circle"
        onClick={() => addCircle(canvas)}
      >
        {""}
      </button>
      <button
        className="sidebar__button sidebar__button_triangle"
        onClick={() => addTriangle(canvas)}
      >
        {""}
      </button>
      <button
        className="sidebar__button sidebar__button_line"
        onClick={() => addLine(canvas)}
      >
        {""}
      </button>
      <button
        className="sidebar__button sidebar__button_text"
        onClick={() => addText(canvas)}
      >
        T
      </button>
    </div>
  );
};
