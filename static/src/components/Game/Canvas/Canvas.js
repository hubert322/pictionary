import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { socket } from "../../../utils/socket";
import "./Canvas.css";
import {
  sendDrawLine,
  sendDrawDot,
  sendUndoCanvas,
  sendClearCanvas
} from "./CanvasApiSocket";
import Overlay from "./Overlay/Overlay";

function Canvas(props) {
  const { gameCode, pid, artist, isDrawing, words } = props;
  const canvas = useRef(null);
  let isMouseDragging = useRef(false);
  let prevX = useRef(0);
  let prevY = useRef(0);
  let color = useRef("#f64f59");
  const paths = useRef([]);

  function touchStart(e) {
    e.preventDefault();
    mouseDown(e, true);
  }

  function mouseDown(e, isTouch = false) {
    if (pid !== artist._id) {
      return;
    }
    isMouseDragging.current = true;
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
    if (pid !== artist._id) {
      return;
    }
    if (isMouseDragging.current) {
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
    if (pid !== artist._id) {
      return;
    }
    isMouseDragging.current = false;
  }

  function draw(e, isMouseMove, touchIndex) {
    const { currX, currY } = getMousePos(e, touchIndex);
    if (isMouseMove) {
      const line = {
        prevX: prevX.current,
        prevY: prevY.current,
        currX: currX,
        currY: currY
      };
      sendDrawLine(gameCode, line);
    } else {
      const dot = {
        x: currX,
        y: currY,
        newColor: color.current
      };
      sendDrawDot(gameCode, dot);
    }
    prevX.current = currX;
    prevY.current = currY;
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
    ctx.strokeStyle = color.current;
    ctx.lineWidth = 2;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.closePath();
    if (addPath) {
      paths.current[paths.current.length - 1].points.push({
        x: currX,
        y: currY
      });
    }
  }

  function drawDot(dot, addPath) {
    const { x, y, newColor } = dot;
    const ctx = canvas.current.getContext("2d");
    color.current = newColor;
    ctx.beginPath();
    ctx.fillStyle = color.current;
    ctx.fillRect(x, y, 2, 2);
    ctx.closePath();
    if (addPath) {
      paths.current.push({
        points: [],
        newColor: color.current
      });
      paths.current[paths.current.length - 1].points.push({ x: x, y: y });
    }
  }

  function undoCanvas() {
    if (paths.current.length) {
      clearCanvas(false);
      paths.current.pop();
      for (let i = 0; i < paths.current.length; ++i) {
        const { points, newColor } = paths.current[i];
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

  function clearCanvas(clearPath) {
    if (paths.current.length) {
      const ctx = canvas.current.getContext("2d");
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      if (clearPath) {
        paths.current = [];
      }
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
      clearCanvas(true);
    });

    return () => {
      socket.off("clear_canvas_announcement");
    };
  }, []);

  return (
    <div className="CanvasContainer">
      {isDrawing ? (
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
      ) : (
        <Overlay gameCode={gameCode} pid={pid} artist={artist} words={words} />
      )}
      <div className="CanvasControlsContainer">
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            color.current = "#f64f59";
          }}
        >
          Red
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            color.current = "#12c2e9";
          }}
        >
          Blue
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            if (paths.current.length) {
              sendUndoCanvas(gameCode);
            }
          }}
        >
          Undo
        </button>
        <button
          type="button"
          className="CanvasControl"
          onClick={() => {
            if (paths.current.length) {
              sendClearCanvas(gameCode);
            }
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  artist: PropTypes.objectOf(PropTypes.string),
  isDrawing: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired
};

Canvas.defaultProps = {
  artist: null
};

export default Canvas;
