import axios from "axios";
import { socket } from "../../utils/socket";
import { serverBaseUrl } from "../../utils/const";

export function sendJoinGame(gameCode, pid, playerName, history) {
  gameCode = gameCode.toLowerCase();
  socket.emit("send_join_room", {
    gameCode: gameCode
  });

  socket.on("join_room_success", data => {
    socket.off("join_room_success");
    socket.off("join_room_error");
    enterRoom(gameCode, pid, playerName, history);
  });

  socket.on("join_room_error", data => {
    socket.off("join_room_success");
    socket.off("join_room_error");
    alert("join room error");
  });
}

export function sendNewGame(pid, playerName, history) {
  socket.emit("send_new_room", {
    pid: pid
  });

  socket.on("new_room_success", data => {
    socket.off("new_room_success");
    socket.off("new_room_error");
    enterRoom(data.gameCode, pid, playerName, history);
  });

  socket.on("new_room_error", data => {
    alert("new room error");
    console.log(data);
    socket.off("new_room_success");
    socket.off("new_room_error");
  });
}

export async function getPid() {
  // let pid = localStorage.getItem("pid");
  // if (pid != null) {
  //   try {
  //     let data = {
  //       pid: pid
  //     };
  //     let response = await axios.post(
  //       serverBaseUrl + "/api/player/isValid",
  //       data
  //     );
  //     console.log(response.data);
  //     if (response.data["isValid"]) {
  //       return pid;
  //     }
  //   } catch (e) {
  //     alert("Error checking pid. Please reload the page.");
  //     console.log(e.response);
  //     return null;
  //   }
  // }

  // Change to not storing pid
  try {
    let response = await axios.post(serverBaseUrl + "/api/player/new");
    console.log(response.data);
    // pid = response.data["pid"];
    // localStorage.setItem("pid", pid);
    return response.data["pid"];
  } catch (e) {
    alert("Failed to get pid. Please reload the page.");
    console.log(e.response);
    return null;
  }
}

function enterRoom(gameCode, pid, playerName, history) {
  let data = {
    gameCode: gameCode,
    pid: pid,
    playerName: playerName
  };
  console.log(data);
  history.push(`/room?gameCode=${gameCode}`, data);
  // socket.on("join_room_announcement", data => {
  //   socket.off("join_room_announcement");
  //   data.gameCode = gameCode;
  //   data.pid = pid;
  //   history.push(`/room?gameCode=${gameCode}`, data);
  // });
}
