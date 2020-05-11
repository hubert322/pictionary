import { socket } from "../../utils/socket";

export function playGame(gameCode, history) {
  socket.emit("play_game", {
    gameCode: gameCode
  });
}
