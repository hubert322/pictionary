import { socket } from "../../utils/socket";

export function playGame(gameCode) {
  socket.emit("play_game", {
    gameCode: gameCode
  });
}
