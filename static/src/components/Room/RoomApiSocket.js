import { socket } from "../../utils/socket";

export function sendEnterRoom(gameCode, pid, playerName) {
  socket.emit("send_enter_room", {
    gameCode: gameCode,
    pid: pid,
    playerName: playerName
  });
}

export function sendPlayGame(gameCode) {
  socket.emit("send_play_game", {
    gameCode: gameCode
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
