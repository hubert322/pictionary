import { socket } from "../../utils/socket";

export function sendEnterRoom(gameCode, pid, playerName) {
  socket.emit("send_enter_room", {
    gameCode: gameCode,
    pid: pid,
    playerName: playerName
  });
}

export function sendPlayGame(gameCode, rounds) {
  socket.emit("send_play_game", {
    gameCode: gameCode,
    rounds: rounds
  });
}
