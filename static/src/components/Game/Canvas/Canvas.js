import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./Canvas.css";

function Canvas() {
  const canvas = useRef(null);
  let isMouseDragging = false;
  let prevX = 0;
  let prevY = 0;
  let color = "#FF0000";
  let paths = [];

  function mouseDown(e) {
    isMouseDragging = true;
    draw(e, false);
  }

  function mouseMove(e) {
    if (isMouseDragging) {
      draw(e, true);
    }
  }

  function mouseUp() {
    isMouseDragging = false;
    console.log(paths);
  }

  function draw(e, isMouseMove) {
    const ctx = canvas.current.getContext("2d");
    let { currX, currY } = getMousePos(e);
    if (isMouseMove) {
      drawLine(ctx, currX, currY, prevX, prevY);
    } else {
      drawDot(ctx, currX, currY);
      paths.push([]);
    }
    paths[paths.length - 1].push({ x: currX, y: currY });
    prevX = currX;
    prevY = currY;
  }

  function drawLine(ctx, currX, currY, prevX, prevY) {
    ctx.strokeStyle = color;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }

  function drawDot(ctx, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 2, 2);
  }

  function getMousePos(e) {
    const rect = canvas.current.getBoundingClientRect();
    return {
      currX:
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvas.current.width,
      currY:
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvas.current.height
    };
  }

  function clearCanvas(isUndoCanvas) {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.beginPath();
    if (!isUndoCanvas) {
      paths = [];
    }
  }

  function undoCanvas() {
    if (paths.length) {
      // console.log(paths);
      clearCanvas(true);
      paths.pop();
      const ctx = canvas.current.getContext("2d");
      for (const path of paths) {
        drawDot(ctx, path[0].x, path[0].y);
        for (let i = 1; i < path.length; ++i) {
          drawLine(ctx, path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
        }
      }
    }
  }

  return (
    <div className="CanvasContainer">
      {/* <CanvasDraw className="Canvas" ref={canvas} onMouseDown={myFunction} /> */}
      <canvas
        className="Canvas"
        ref={canvas}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      />
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
          onClick={() => clearCanvas(false)}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Canvas;
