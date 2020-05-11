import axios from "axios";
import { socket } from "../../utils/socket";
import { serverBaseUrl } from "../../utils/const";

export async function joinGame(gameCode, uid, username, history) {
  socket.emit(
    "join_room",
    {
      gameCode: gameCode,
      uid: uid,
      username: username
    },
    data => {
      console.log("join game");
      console.log(data);
      if (data.users !== {}) {
        history.push(`/room?gameCode=${gameCode}`, data);
      } else {
        socket.disconnect();
      }
    }
  );
}

export function newGame(uid, username, history) {
  socket.emit(
    "new_room",
    {
      uid: uid,
      username: username
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

export function getUid() {
  let uid = localStorage.getItem("uid");
  if (uid != null) {
    return uid;
  }
  return (async () => {
    try {
      let response = await axios.post(serverBaseUrl + "/api/user/new");
      console.log(response.data);
      uid = response.data["uid"];
      localStorage.setItem("uid", uid);
    } catch (e) {
      console.log(e.response.data);
    }

    return uid;
  })();
}
