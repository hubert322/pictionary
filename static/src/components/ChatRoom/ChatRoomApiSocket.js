import { socket } from "../../utils/socket";

export function sendMessage(gameCode, pid) {
  socket.emit("send_message", {
    gameCode: gameCode,
    pid: pid
  });
}
