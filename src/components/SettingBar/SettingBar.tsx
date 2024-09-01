import Colorful from "@uiw/react-color-colorful";
import { useCanvas } from "../../hooks/useCanvas";

import "./style.scss";
import { useState } from "react";
export const SettingBar = ({ isOpen }: { isOpen: boolean }) => {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 0, a: 1 });
  const { canvas } = useCanvas();
  return (
    <>
      {isOpen && (
        <div className="settings">
          <Colorful
            color={hsva}
            onChange={(color) => {
              if (canvas) {
                canvas
                  .getActiveObjects()
                  .forEach((obj) => obj.set("fill", color.hexa));
                canvas.renderAll();
                setHsva(color.hsva);
              }
            }}
          ></Colorful>
        </div>
      )}
    </>
  );
};
