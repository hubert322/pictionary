import { socket } from "../../utils/socket";

export function sendPlayGame(gameCode, rounds, drawTime) {
  drawTime = parseInt(drawTime.slice(0, -1));
  socket.emit("send_play_game", {
    gameCode: gameCode,
    rounds: rounds,
    drawTime: drawTime
  });
}
