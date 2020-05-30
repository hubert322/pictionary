import { socket } from "../../utils/socket";

export function sendPlayGame(gameCode, rounds, drawTime) {
  socket.emit("send_play_game", {
    gameCode: gameCode,
    rounds: rounds,
    drawTime: drawTime
  });
}
