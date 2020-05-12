import { socket } from "../../../utils/socket";

export function sendDrawLine(gameCode, pid, line) {
  socket.emit("send_draw_line", {
    gameCode: gameCode,
    pid: pid,
    line: line
  });
}

export function sendDrawDot(gameCode, pid, dot) {
  socket.emit("send_draw_dot", {
    gameCode: gameCode,
    pid: pid,
    dot: dot
  });
}
