import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { socket } from "../../../utils/socket";
import "./Canvas.css";
import { sendDrawLine, sendDrawDot } from "./CanvasApiSocket";

function Canvas(props) {
  const { gameCode, pid } = props;
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
  }

  function draw(e, isMouseMove) {
    const ctx = canvas.current.getContext("2d");
    let { currX, currY } = getMousePos(e);
    if (isMouseMove) {
      const line = {
        prevX: prevX,
        prevY: prevY,
        currX: currX,
        currY: currY,
        color: color
      };
      drawLine(ctx, line);
    } else {
      const dot = {
        x: currX,
        y: currY,
        color: color
      };
      drawDot(ctx, dot);
      paths.push([]);
    }
    paths[paths.length - 1].push({ x: currX, y: currY });
    prevX = currX;
    prevY = currY;
  }

  function drawLine(ctx, line) {
    const { prevX, prevY, currX, currY, color } = line;
    ctx.strokeStyle = color;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    sendDrawLine(gameCode, pid, line);
  }

  function drawDot(ctx, dot) {
    const { x, y, color } = dot;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 2, 2);
    sendDrawDot(gameCode, pid, dot);
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
      clearCanvas(true);
      paths.pop();
      const ctx = canvas.current.getContext("2d");
      for (const path of paths) {
        const dot = {
          x: path[0].x,
          y: path[0].y,
          color: color
        };
        drawDot(ctx, dot);
        for (let i = 1; i < path.length; ++i) {
          const line = {
            prevX: path[i - 1].x,
            prevY: path[i - 1].y,
            currX: path[i].x,
            currY: path[i].y,
            color: color
          };
          drawLine(ctx, line);
        }
      }
    }
  }

  useEffect(() => {
    socket.on("draw_line_announcement", data => {
      if (pid != data.pid) {
        const ctx = canvas.current.getContext("2d");
        drawLine(ctx, data.line);
      }
    });

    return () => {
      socket.off("draw_line_announcemen");
    };
  }, []);

  useEffect(() => {
    socket.on("draw_dot_announcement", data => {
      if (pid != data.pid) {
        const ctx = canvas.current.getContext("2d");
        drawDot(ctx, data.dot);
      }
    });

    return () => {
      socket.off("draw_dot_announcemen");
    };
  }, []);

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

Canvas.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired
};

export default Canvas;
