import { socket } from "../../utils/socket";

export function sendEnterGame(gameCode) {
  socket.emit("send_enter_game", {
    gameCode: gameCode
  });
}
