import { socket } from "../../../../utils/socket";

export function sendSelectedWord(gameCode, word) {
  socket.emit("send_selected_word", {
    gameCode: gameCode,
    word: word
  });
}
