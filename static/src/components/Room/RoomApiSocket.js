import { socket } from "../../utils/socket";

export function sendPlayGame(gameCode, rounds, drawTime) {
  drawTime = parseInt(drawTime.slice(0, -1));
  socket.emit("send_play_game", {
    gameCode: gameCode,
    rounds: rounds,
    drawTime: drawTime
  });
}

export function sendRounds(gameCode, rounds) {
  console.log(rounds);
  rounds = parseInt(rounds);
  socket.emit("send_rounds", {
    gameCode: gameCode,
    rounds: rounds
  });
}

export function sendDrawTime(gameCode, drawTime) {
  drawTime = parseInt(drawTime.slice(0, -1));
  socket.emit("send_draw_time", {
    gameCode: gameCode,
    drawTime: drawTime
  });
}
