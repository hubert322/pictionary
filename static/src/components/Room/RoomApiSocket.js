import { socket } from "../../utils/socket";

export function sendPlayGame(gameCode, rounds, drawTime) {
  rounds = 1;
  drawTime = 5;
  socket.emit("send_play_game", {
    gameCode: gameCode,
    rounds: rounds,
    drawTime: drawTime
  });
}
