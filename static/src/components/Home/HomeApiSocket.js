import axios from "axios";
import { socket } from "../../utils/socket";
import { serverBaseUrl } from "../../utils/const";

export function joinGame(gameCode, pid, playerName, history) {
  socket.emit(
    "join_room",
    {
      gameCode: gameCode,
      pid: pid,
      playerName: playerName
    },
    data => {
      console.log("join game");
      console.log(data);
      data.gameCode = gameCode;
      if (data.players !== {}) {
        history.push(`/room?gameCode=${gameCode}`, data);
      } else {
        socket.disconnect();
      }
    }
  );
}

export function newGame(pid, playerName, history) {
  socket.emit(
    "new_room",
    {
      pid: pid,
      playerName: playerName
    },
    data => {
      console.log("new game");
      console.log(data);
      if (data.gameCode !== "") {
        history.push(`/room?gameCode=${data.gameCode}`, data);
      } else {
        socket.disconnect();
      }
    }
  );
}

export function getPid() {
  let pid = localStorage.getItem("pid");
  if (pid != null) {
    return pid;
  }
  return (async () => {
    try {
      let response = await axios.post(serverBaseUrl + "/api/player/new");
      console.log(response.data);
      pid = response.data["pid"];
      localStorage.setItem("pid", pid);
    } catch (e) {
      console.log(e.response.data);
    }

    return pid;
  })();
}
