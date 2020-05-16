import axios from "axios";
import { socket } from "../../utils/socket";
import { serverBaseUrl } from "../../utils/const";

export function sendJoinGame(gameCode, pid, playerName, history) {
  console.log(history);
  socket.emit("send_join_room", {
    gameCode: gameCode,
    pid: pid,
    playerName: playerName
  });

  socket.on("join_room_success", data => {
    socket.off("join_room_success");
    console.log(history);
    onJoinRoomAnnouncement(gameCode, pid, history);
  });

  socket.on("join_room_error", data => {
    socket.off("join_room_error");
    console.log("join room error");
  });
}

export function sendNewGame(pid, playerName, history) {
  socket.emit("send_new_room", {
    pid: pid,
    playerName: playerName
  });

  socket.on("new_room_success", data => {
    socket.off("new_room_success");
    onJoinRoomAnnouncement(data.gameCode, pid, history);
  });

  socket.on("new_room_error", data => {
    console.log("new room error");
    console.log(data);
    socket.off("new_room_error");
  });
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

function onJoinRoomAnnouncement(gameCode, pid, history) {
  socket.on("join_room_announcement", data => {
    socket.off("join_room_announcement");
    data.gameCode = gameCode;
    data.pid = pid;
    history.push(`/room?gameCode=${gameCode}`, data);
  });
}
