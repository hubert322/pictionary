import axios from "axios";
import io from "socket.io-client";
import { serverBaseUrl } from "../../utils/const";

export async function joinGame(gameCode, uid, history) {
  const socket = io.connect(serverBaseUrl);
  socket.on("connect", () => {
    console.log("connect");
    socket.emit("join_room", {
      gameCode: gameCode,
      uid: uid
    });
  });

  socket.on("join_room_announcement", () => {
    history.push(`/lobby?gameCode=${gameCode}`);
  });
  // try {
  //   let response = await axios.patch(serverBaseUrl + "/api/lobby/join", {
  //     gameCode: gameCode,
  //     uid: uid
  //   });
  //   console.log(response.data);
  //   history.push(`/lobby?gameCode=${gameCode}`);
  // } catch (e) {
  //   console.log(e.response.data);
  // }
}

export function newGame(uid, history) {
  const socket = io.connect(serverBaseUrl);
  socket.on("connect", () => {
    console.log("connect");
    console.log(uid);
    socket.emit("new_room", {
      uid: uid
    });
  });

  socket.on("join_room_announcement", data => {
    history.push(`/lobby?gameCode=${data.gameCode}`);
  });
  // try {
  //   let response = await axios.post(serverBaseUrl + "/api/lobby/new", {
  //     uid: uid
  //   });
  //   console.log(response.data);
  //   history.push(`/lobby?gameCode=${response.data.gameCode}`);
  // } catch (e) {
  //   console.log(e.response.data);
  // }
}

export function getUid() {
  let uid = localStorage.getItem("uid");
  if (uid != null) {
    return uid;
  }
  return async () => {
    try {
      let response = await axios.post(serverBaseUrl + "/api/user/new");
      console.log(response.data);
      uid = response.data["uid"];
      localStorage.setItem("uid", uid);
    } catch (e) {
      console.log(e.response.data);
    }

    return uid;
  };
}
