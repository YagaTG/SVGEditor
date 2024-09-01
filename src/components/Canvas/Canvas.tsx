import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useCanvas } from "../../hooks/useCanvas";
import { SettingBar } from "../SettingBar/SettingBar";

export const Canvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>();
  const { setCurrentZoom, setCanvas, setCanvasState } = useCanvas();
  const [isSelect, setSelect] = useState(false);
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    function resizeCanvas() {
      const ratio = canvas.getWidth() / canvas.getHeight();
      const containerWidth = window.innerWidth;
      const scale = containerWidth / canvas.getWidth();
      const zoom = canvas.getZoom() * scale;
      canvas.setDimensions({
        width: window.innerWidth,
        height: containerWidth / ratio,
      });
      canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
    }
    window.addEventListener("resize", resizeCanvas);
    canvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      if (delta > 0) {
        zoom = canvas.getZoom() - 25 / 100;
      } else {
        zoom = canvas.getZoom() + 25 / 100;
      }

      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      setCurrentZoom(zoom);
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY } as any, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on("mouse:down", function (opt: any) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        console.log(evt);

        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", function (opt: any) {
      if (this.isDragging) {
        const e = opt.e;
        const vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function () {
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });

    canvas.on("selection:cleared", () => {
      setSelect(false);
    });
    canvas.on("selection:created", () => {
      setSelect(true);
    });
    function deleteObjects(e: KeyboardEvent) {
      if (
        e.keyCode == 46 ||
        e.key == "Delete" ||
        e.code == "Delete" ||
        e.key == "Backspace"
      ) {
        canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
        canvas.discardActiveObject();
        canvas.renderAll();
        const canvasState = { ...canvas.toJSON(), isDeleted: true };
        setCanvasState(canvasState);
      }
    }
    canvas.on("object:added", () => {
      const canvasState = canvas.toJSON();
      setCanvasState(canvasState);
    });
    canvas.on("object:modified", () => {
      const canvasState = canvas.toJSON();
      setCanvasState(canvasState);
    });

    document.addEventListener("keydown", deleteObjects);
    setCanvas(canvas);
    setCanvasState({ ...canvas.toJSON(), ind: 0 });
    resizeCanvas();
    canvas.setZoom(1);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("keydown", deleteObjects);
      canvas.dispose();
    };
  }, []);
  return (
    <div>
      <canvas className="canvas" width={100} height={100} ref={canvasEl} />
      <SettingBar isOpen={isSelect}></SettingBar>
    </div>
  );
};
