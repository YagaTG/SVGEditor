import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useCanvas } from "../../hooks/useCanvas";

export const Canvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>();

  const { setCurrentZoom, setCanvas, setSelectedObjects } = useCanvas();
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);

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
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on("mouse:down", function (opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", function (opt) {
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
      setSelectedObjects([]);
    });

    function deleteObjects(e: KeyboardEvent) {
      if (
        e.keyCode == 46 ||
        e.key == "Delete" ||
        e.code == "Delete" ||
        e.key == "Backspace"
      ) {
        if (canvas._activeObject) {
          setSelectedObjects([]);
          canvas.remove(canvas._activeObject);
          canvas.renderAll();
        }
      }
    }

    document.addEventListener("keydown", deleteObjects);
    setCanvas(canvas);
    return () => {
      document.removeEventListener("keydown", deleteObjects);
      canvas.dispose();
    };
  }, []);
  return (
    <canvas className="canvas" width="1000" height="1000" ref={canvasEl} />
  );
};
