import { socket } from "../../utils/socket";

export function sendNextTurn(gameCode) {
  socket.emit("send_next_turn", {
    gameCode: gameCode
  });
}
