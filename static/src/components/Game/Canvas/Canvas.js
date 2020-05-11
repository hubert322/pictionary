import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./Canvas.css";

function Canvas() {
  const canvas = useRef(null);

  function clearCanvas() {
    canvas.current.clear();
  }

  function undoCanvas() {
    canvas.current.undo();
  }

  return (
    <div className="CanvasContainer">
      <CanvasDraw className="Canvas" ref={canvas} />
      <div className="CanvasControlsContainer">
        <button
          type="button"
          className="CanvasControl"
          onClick={() => undoCanvas()}
        >
          Undo
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => clearCanvas()}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Canvas;
