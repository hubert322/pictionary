import axios from "axios";
import { socket } from "../../utils/socket";
import { serverBaseUrl } from "../../utils/const";

export async function joinGame(gameCode, uid, name, history) {
  socket.emit(
    "join_room",
    {
      gameCode: gameCode,
      uid: uid,
      name: name
    },
    isSuccess => {
      console.log(isSuccess);
      if (isSuccess) {
        history.push(`/room?gameCode=${gameCode}`);
      } else {
        socket.disconnect();
      }
    }
  );
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

export function newGame(uid, name, history) {
  socket.emit(
    "new_room",
    {
      uid: uid,
      name: name
    },
    gameCode => {
      if (gameCode != "") {
        history.push(`/room?gameCode=${gameCode}`);
      } else {
        socket.disconnect();
      }
    }
  );
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
