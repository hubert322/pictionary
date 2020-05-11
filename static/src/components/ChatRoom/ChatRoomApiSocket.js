import { socket } from "../../utils/socket";

export function sendMessage(gameCode, pid, message) {
  socket.emit("send_message", {
    gameCode: gameCode,
    pid: pid,
    message: message
  });
}
