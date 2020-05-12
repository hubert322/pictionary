import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { socket } from "../../../utils/socket";
import "./Canvas.css";
import {
  sendDrawLine,
  sendDrawDot,
  sendUndoCanvas,
  sendClearCanvas
} from "./CanvasApiSocket";

function Canvas(props) {
  const { gameCode } = props;
  const canvas = useRef(null);
  let isMouseDragging = false;
  let prevX = 0;
  let prevY = 0;
  let color = "#f64f59";
  let paths = [];

  function touchStart(e) {
    e.preventDefault();
    mouseDown(e, true);
  }

  function mouseDown(e, isTouch = false) {
    isMouseDragging = true;
    if (isTouch) {
      for (let i = 0; i < 1; ++i) {
        draw(e, false, i);
      }
    } else {
      draw(e, false, -1);
    }
  }

  function touchMove(e) {
    e.preventDefault();
    mouseMove(e, true);
  }

  function mouseMove(e, isTouch = false) {
    if (isMouseDragging) {
      if (isTouch) {
        for (let i = 0; i < 1; ++i) {
          draw(e, true, i);
        }
      } else {
        draw(e, true, -1);
      }
    }
  }

  function touchEnd(e) {
    e.preventDefault();
    mouseUp();
  }

  function mouseUp() {
    isMouseDragging = false;
  }

  function draw(e, isMouseMove, touchIndex) {
    let { currX, currY } = getMousePos(e, touchIndex);
    if (isMouseMove) {
      const line = {
        prevX: prevX,
        prevY: prevY,
        currX: currX,
        currY: currY
      };
      sendDrawLine(gameCode, line);
    } else {
      const dot = {
        x: currX,
        y: currY,
        newColor: color
      };
      sendDrawDot(gameCode, dot);
    }
    prevX = currX;
    prevY = currY;
  }

  function getMousePos(e, touchIndex) {
    const rect = canvas.current.getBoundingClientRect();
    let windowX, windowY;
    if (touchIndex != -1) {
      windowX = e.touches[touchIndex].clientX;
      windowY = e.touches[touchIndex].clientY;
    } else {
      windowX = e.clientX;
      windowY = e.clientY;
    }
    return {
      currX:
        ((windowX - rect.left) / (rect.right - rect.left)) *
        canvas.current.width,
      currY:
        ((windowY - rect.top) / (rect.bottom - rect.top)) *
        canvas.current.height
    };
  }

  function drawLine(line, addPath) {
    const { prevX, prevY, currX, currY } = line;
    const ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
    if (addPath) {
      paths[paths.length - 1].points.push({ x: currX, y: currY });
    }
  }

  function drawDot(dot, addPath) {
    const { x, y, newColor } = dot;
    const ctx = canvas.current.getContext("2d");
    color = newColor;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 2, 2);
    ctx.closePath();
    if (addPath) {
      paths.push({
        points: [],
        newColor: color
      });
      paths[paths.length - 1].points.push({ x: x, y: y });
    }
  }

  function undoCanvas() {
    if (paths.length) {
      clearCanvas(true);
      paths.pop();
      for (let i = 0; i < paths.length; ++i) {
        const { points, newColor } = paths[i];
        const dot = {
          x: points[0].x,
          y: points[0].y,
          newColor: newColor
        };
        drawDot(dot, false);
        for (let j = 1; j < points.length; ++j) {
          const line = {
            prevX: points[j - 1].x,
            prevY: points[j - 1].y,
            currX: points[j].x,
            currY: points[j].y
          };
          drawLine(line, false);
        }
      }
    }
  }

  function clearCanvas(isUndoCanvas) {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // ctx.beginPath();
    if (!isUndoCanvas) {
      paths = [];
    }
  }

  useEffect(() => {
    socket.on("draw_line_announcement", data => {
      drawLine(data.line, true);
    });

    return () => {
      socket.off("draw_line_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("draw_dot_announcement", data => {
      drawDot(data.dot, true);
    });

    return () => {
      socket.off("draw_dot_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("undo_canvas_announcement", () => {
      undoCanvas();
    });

    return () => {
      socket.off("undo_canvas_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("clear_canvas_announcement", () => {
      clearCanvas(false);
    });

    return () => {
      socket.off("clear_canvas_announcement");
    };
  }, []);

  return (
    <div className="CanvasContainer">
      <canvas
        className="Canvas"
        ref={canvas}
        onTouchStart={touchStart}
        onMouseDown={mouseDown}
        onTouchMove={touchMove}
        onMouseMove={mouseMove}
        onTouchEnd={touchEnd}
        onMouseUp={mouseUp}
      />
      <div className="CanvasControlsContainer">
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            color = "#f64f59";
          }}
        >
          Red
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            color = "#12c2e9";
          }}
        >
          Blue
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => sendUndoCanvas(gameCode)}
        >
          Undo
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => sendClearCanvas(gameCode)}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  gameCode: PropTypes.string.isRequired
};

export default Canvas;
