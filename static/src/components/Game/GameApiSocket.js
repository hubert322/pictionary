import { socket } from "../../utils/socket";

export function sendNextTurn(gameCode) {
  console.log("SEND");
  socket.emit("send_next_turn", {
    gameCode: gameCode
  });
}
