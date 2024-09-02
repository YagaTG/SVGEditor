import "./style.scss";
import { useCanvas } from "../../hooks/useCanvas";
import { useState } from "react";
import { ModalWindow } from "../ModalWindow/ModalWIndow";
import { copyText } from "../../helpers/textHandler";
import { useObjectCreator } from "../../hooks/useObjectCreator";
import { ZoomButtons } from "../Zoom/ZoomButtons";

export const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isSuccesfulCopied, setSuccecfulCopied] = useState<boolean>(false);
  const { addCircle, addRect, addLine, addText, addTriangle, addImage } =
    useObjectCreator();
  const { canvas } = useCanvas();
  return (
    <div className="handler">
      <button
        onClick={() => setModalOpen(true)}
        className="sidebar__button_save"
      >
        Сохранить
      </button>
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
        <form>
          <label className="sidebar__form">
            <input
              type="file"
              className="sidebar__input"
              onChange={(e) => addImage(e, canvas)}
            />
            <span className="sidebar__button sidebar__button_img"></span>
          </label>
        </form>

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
              <code className="modal__content">{canvas.toSVG()}</code>

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
      </div>
      <ZoomButtons />
    </div>
  );
};
