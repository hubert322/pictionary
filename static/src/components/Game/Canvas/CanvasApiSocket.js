import { socket } from "../../../utils/socket";

export function sendDrawLine(gameCode, line) {
  socket.emit("send_draw_line", {
    gameCode: gameCode,
    line: line
  });
}

export function sendDrawDot(gameCode, dot) {
  socket.emit("send_draw_dot", {
    gameCode: gameCode,
    dot: dot
  });
}

export function sendDrawFill(gameCode, fill) {
  socket.emit("send_draw_fill", {
    gameCode: gameCode,
    fill: fill
  });
}

export function sendUndoCanvas(gameCode) {
  socket.emit("send_undo_canvas", {
    gameCode: gameCode
  });
}

export function sendClearCanvas(gameCode) {
  socket.emit("send_clear_canvas", {
    gameCode: gameCode
  });
}
