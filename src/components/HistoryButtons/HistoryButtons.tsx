import { useCanvas } from "../../hooks/useCanvas";

import "./style.scss";

export const HistoryButtons = () => {
  const {
    canvas,
    historyChanges,
    setHistoryChanges,
    historyRedo,
    setHistoryRedo,
  } = useCanvas();
  return (
    <div className="history">
      <button
        disabled={historyChanges.length == 1}
        className="history__btn history__btn_undo"
        onClick={() => {
          if (canvas) {
            if (historyChanges.length > 1) {
              canvas.loadFromJSON(historyChanges[historyChanges.length - 2]);
              const newHistoryRedo = [...historyRedo];

              setTimeout(function () {
                canvas.renderAll();
              }, 1);
              newHistoryRedo.unshift(historyChanges[historyChanges.length - 1]);
              // console.log(
              //   "Актуальная истории ДО: ",
              //   historyChanges.slice(0, historyChanges.length - 1)
              // );
              // console.log("Актуальная истории После: ", newHistoryRedo);
              setHistoryChanges(
                historyChanges.slice(0, historyChanges.length - 1)
              );
              setHistoryRedo(newHistoryRedo);
            }
          }
        }}
      ></button>
      <button
        disabled={!historyRedo.length}
        className="history__btn history__btn_redo"
        onClick={() => {
          if (canvas && historyRedo.length > 0) {
            canvas.loadFromJSON(historyRedo[0]);
            const newHistoryRedo = [...historyRedo];

            setTimeout(function () {
              canvas.renderAll();
            }, 1);
            newHistoryRedo.shift();
            // console.log([...historyChanges, historyRedo[0]]);
            // console.log("Актуальная истории После: ", newHistoryRedo);
            setHistoryChanges([...historyChanges, historyRedo[0]]);
            setHistoryRedo(newHistoryRedo);
          }
        }}
      ></button>
    </div>
  );
};
