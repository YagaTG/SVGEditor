import {
  addCircle,
  addLine,
  addRect,
  addText,
  addTriangle,
} from "../../helpers/objectCreator";

import "./style.scss";
import { useCanvas } from "../../hooks/useCanvas";
import { useState } from "react";
import { ModalWindow } from "../ModalWindow/ModalWIndow";
import { copyText } from "../../helpers/textHandler";

export const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isSuccesfulCopied, setSuccecfulCopied] = useState<boolean>(false);
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
      {isModalOpen && canvas && (
        <ModalWindow
          closeFuncs={[setModalOpen, setSuccecfulCopied]}
          closeFunc={setModalOpen}
        >
          <div
            className="modal__wrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <p className="modal__heading">SVG:</p>
            <p className="modal__content">{canvas.toSVG()}</p>

            <button
              className="modal__copy-btn"
              onClick={() => {
                copyText(canvas.toSVG()).then(() => setSuccecfulCopied(true));
              }}
            >
              {isSuccesfulCopied ? "Успешно" : "Скопировать"}
            </button>
          </div>
        </ModalWindow>
      )}
      <button onClick={() => setModalOpen(true)}> Сохранить</button>
    </div>
  );
};
