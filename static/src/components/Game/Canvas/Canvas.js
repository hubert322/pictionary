import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { IoMdUndo } from "react-icons/io";
import { FaTrash, FaPaintBrush, FaCheck } from "react-icons/fa";
import { GiPaintBucket } from "react-icons/gi";
import { socket } from "../../../utils/socket";
import {
  sendDrawLine,
  sendDrawDot,
  sendDrawFill,
  sendUndoCanvas,
  sendClearCanvas
} from "./CanvasApiSocket";
import Panel from "../../Panel/Panel";
import "../../App/App.css";
import "./Canvas.css";

function Canvas(props) {
  const { gameCode, pid, artist, selectedWord, currRound, timer } = props;
  const [color, setColor] = useState("#000000");
  const [brushStyle, setBrushStyle] = useState("brush");
  const canvas = useRef(null);
  let isMouseDragging = useRef(false);
  let prevX = useRef(null);
  let prevY = useRef(null);
  const paths = useRef([]);
  const colors = [
    "#000000",
    "#FFFFFF",
    "#808080",
    "#C0C0C0",
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#7F00FF",
    "#FF00FF"
  ];
  const controlsIconSize = "5vmin";

  function touchStart(e) {
    e.preventDefault();
    mouseDown(e, true);
  }

  function mouseDown(e, isTouch = false) {
    if (artist === null || pid !== artist._id) {
      return;
    }
    isMouseDragging.current = true;
    document.body.style.userSelect = "none";
    window.getSelection().removeAllRanges();
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
    if (artist === null || pid !== artist._id || brushStyle === "bucket") {
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
    if (artist === null || pid !== artist._id) {
      return;
    }
    document.body.style.userSelect = "auto";
    isMouseDragging.current = false;
  }

  function mouseLeave() {
    prevX.current = null;
    prevY.current = null;
  }

  function draw(e, isMouseMove, touchIndex) {
    const { currX, currY } = getMousePos(e, touchIndex);
    if (brushStyle === "brush") {
      if (isMouseMove && prevX.current !== null && prevY.current !== null) {
        const line = {
          prevX: prevX.current,
          prevY: prevY.current,
          currX: currX,
          currY: currY,
          newColor: color
        };
        drawLine(line, true);
        sendDrawLine(gameCode, line);
      } else {
        const dot = {
          x: currX,
          y: currY,
          newColor: color
        };
        drawDot(dot, true);
        sendDrawDot(gameCode, dot);
      }
      prevX.current = currX;
      prevY.current = currY;
    } else {
      const fill = {
        x: currX,
        y: currY,
        newColor: color
      };
      drawFill(fill, true);
      sendDrawFill(gameCode, fill);
    }
  }

  function getMousePos(e, touchIndex) {
    const rect = canvas.current.getBoundingClientRect();
    let windowX, windowY;
    if (touchIndex !== -1) {
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
    const { prevX, prevY, currX, currY, newColor } = line;
    const ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = newColor;
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
    ctx.beginPath();
    ctx.fillStyle = newColor;
    ctx.fillRect(x, y, 2, 2);
    ctx.closePath();
    if (addPath) {
      paths.current.push({
        points: [],
        newColor: newColor,
        brushStyle: "brush"
      });
      paths.current[paths.current.length - 1].points.push({ x: x, y: y });
    }
  }

  function drawFill(fill, addPath) {
    function getInitialColor(x, y, imageData) {
      const baseIndex = (y * width + x) * 4;
      const redOffset = 0;
      const greenOffset = 1;
      const blueOffset = 2;
      const alphaOffset = 3;
      return [
        imageData.data[baseIndex + redOffset],
        imageData.data[baseIndex + greenOffset],
        imageData.data[baseIndex + blueOffset],
        imageData.data[baseIndex + alphaOffset]
      ];
    }

    function isInRange(x, y, width, height) {
      return 0 <= x && x < width && 0 <= y && y < height;
    }

    function isEmpty(x, y, width, imageData, r, g, b, a) {
      // 4 is used since each cell has rgba
      const baseIndex = (y * width + x) * 4;
      const redOffset = 0;
      const greenOffset = 1;
      const blueOffset = 2;
      const alphaOffset = 3;
      return (
        imageData.data[baseIndex + redOffset] === r &&
        imageData.data[baseIndex + greenOffset] === g &&
        imageData.data[baseIndex + blueOffset] === b &&
        imageData.data[baseIndex + alphaOffset] === a
      );
    }

    let { x, y, newColor } = fill;
    x = Math.floor(x);
    y = Math.floor(y);
    const ctx = canvas.current.getContext("2d");
    let { width, height } = canvas.current.getBoundingClientRect();
    width = Math.floor(width);
    height = Math.floor(height);

    if (!isInRange(x, y, width, height)) {
      return;
    }

    const imageData = ctx.getImageData(0, 0, width, height);
    const [r, g, b, a] = getInitialColor(x, y, imageData);

    const dirs = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1]
    ];
    const visited = {};
    visited[`${x}+${y}`] = 1;
    let stack = [[x, y]];
    ctx.beginPath();
    ctx.fillStyle = newColor;
    ctx.fillRect(x, y, 1, 1);

    while (stack.length) {
      const [x, y] = stack.pop();
      for (const [dx, dy] of dirs) {
        const newX = x + dx;
        const newY = y + dy;
        if (
          isInRange(newX, newY, width, height) &&
          isEmpty(newX, newY, width, imageData, r, g, b, a) &&
          !visited.hasOwnProperty(`${newX}+${newY}`)
        ) {
          ctx.fillRect(newX, newY, 1, 1);
          stack.push([newX, newY]);
          visited[`${newX}+${newY}`] = 1;
        }
      }
    }
    ctx.closePath();

    if (addPath) {
      paths.current.push({
        points: [],
        newColor: newColor,
        brushStyle: "bucket"
      });
      paths.current[paths.current.length - 1].points.push({ x: x, y: y });
    }
  }

  function undoCanvas() {
    if (paths.current.length) {
      clearCanvas(false);
      paths.current.pop();
      for (let i = 0; i < paths.current.length; ++i) {
        const { points, newColor, brushStyle } = paths.current[i];
        if (brushStyle === "brush") {
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
        } else {
          const fill = {
            x: points[0].x,
            y: points[0].y,
            newColor: newColor
          };
          drawFill(fill, false);
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

  function getUnderlinedWord(word) {
    let underlinedWord = "";
    for (let i = 0; i < word.length; ++i) {
      if (word[i] === " ") {
        underlinedWord += "  ";
      } else {
        underlinedWord += "__";
      }
      if (i + 1 !== word.length) {
        underlinedWord += "  ";
      }
    }
    return underlinedWord;
  }

  useEffect(() => {
    socket.on("draw_line_announcement", data => {
      if (canvas.current !== null) {
        drawLine(data.line, true);
      }
    });

    return () => {
      socket.off("draw_line_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("draw_dot_announcement", data => {
      if (canvas.current !== null) {
        drawDot(data.dot, true);
      }
    });

    return () => {
      socket.off("draw_dot_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("draw_fill_announcement", data => {
      if (canvas.current !== null) {
        drawFill(data.fill, true);
      }
    });

    return () => {
      socket.off("draw_fill_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("undo_canvas_announcement", () => {
      if (canvas.current !== null) {
        undoCanvas();
      }
    });

    return () => {
      socket.off("undo_canvas_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("clear_canvas_announcement", () => {
      if (canvas.current !== null) {
        clearCanvas(true);
      }
    });

    return () => {
      socket.off("clear_canvas_announcement");
    };
  }, []);

  useEffect(() => {
    if (selectedWord === null) {
      clearCanvas(true);
    }
  }, [selectedWord]);

  return (
    <Panel className="CanvasContainer">
      <div className="CanvasHeader">
        <span className="CanvasCurrRound">Round: {currRound}</span>
        <span className="CanvasUnderlinedWord">
          Word:{" "}
          {artist !== null && pid !== artist._id && selectedWord !== null
            ? getUnderlinedWord(selectedWord)
            : selectedWord}
        </span>
        <span className="CanvasTimer">Timer: {timer}s</span>
      </div>
      <canvas
        className="Canvas"
        ref={canvas}
        onTouchStart={touchStart}
        onMouseDown={mouseDown}
        onTouchMove={touchMove}
        onMouseMove={mouseMove}
        onTouchEnd={touchEnd}
        onMouseUp={mouseUp}
        onMouseLeave={mouseLeave}
      />
      <div className="CanvasDummy" />
      <div className="CanvasControlsContainer">
        <div className="CanvasColorsContainer">
          {colors.map(tmpColor => (
            <button
              key={tmpColor}
              type="button"
              style={{
                backgroundColor: tmpColor,
                color:
                  artist !== null && pid === artist._id && color === tmpColor
                    ? tmpColor !== "#FFFFFF"
                      ? "white"
                      : "black"
                    : tmpColor
              }}
              className="Button CanvasControl CanvasColorControl"
              disabled={artist !== null && pid !== artist._id}
              onClick={() => {
                setColor(tmpColor);
              }}
            >
              <IconContext.Provider
                value={{
                  size: "2.5vmin"
                }}
              >
                <FaCheck />
              </IconContext.Provider>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="Button CanvasControl"
          style={{
            backgroundColor:
              artist !== null && pid === artist._id && brushStyle === "brush"
                ? "#f64f59"
                : "#ffffff"
          }}
          onClick={() => setBrushStyle("brush")}
        >
          <IconContext.Provider
            value={{
              size: controlsIconSize
            }}
          >
            <FaPaintBrush />
          </IconContext.Provider>
        </button>
        <button
          type="button"
          className="Button CanvasControl"
          style={{
            backgroundColor:
              artist !== null && pid === artist._id && brushStyle === "bucket"
                ? "#f64f59"
                : "#ffffff"
          }}
          onClick={() => setBrushStyle("bucket")}
        >
          <IconContext.Provider
            value={{
              size: controlsIconSize
            }}
          >
            <GiPaintBucket />
          </IconContext.Provider>
        </button>
        <button
          type="button"
          className="Button CanvasControl"
          onClick={() => {
            if (paths.current.length && artist !== null && pid === artist._id) {
              sendUndoCanvas(gameCode);
            }
          }}
        >
          <IconContext.Provider
            value={{
              size: controlsIconSize
            }}
          >
            <IoMdUndo />
          </IconContext.Provider>
        </button>
        <button
          type="button"
          className="Button CanvasControl"
          onClick={() => {
            if (paths.current.length && artist !== null && pid === artist._id) {
              sendClearCanvas(gameCode);
            }
          }}
        >
          <IconContext.Provider
            value={{
              size: controlsIconSize
            }}
          >
            <FaTrash />
          </IconContext.Provider>
        </button>
        {artist === null || pid !== artist._id ? (
          <div className="CanvasControlsOverlay" />
        ) : null}
      </div>
    </Panel>
  );
}

Canvas.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  artist: PropTypes.objectOf(PropTypes.string),
  selectedWord: PropTypes.string,
  currRound: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired
};

Canvas.defaultProps = {
  artist: null,
  selectedWord: ""
};

export default Canvas;
