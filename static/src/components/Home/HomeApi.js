import axios from "axios";

export async function joinGame(gameCode, uid, history) {
  try {
    let response = await axios.patch(
      "http://192.168.43.2:5000/api/lobby/join",
      {
        gameCode: gameCode,
        uid: uid
      }
    );
    console.log(response.data);
    history.push(`/lobby?gameCode=${gameCode}`);
  } catch (e) {
    console.log(e.response.data);
  }
}

export async function newGame(uid, history) {
  try {
    let response = await axios.post("http://192.168.43.2:5000/api/lobby/new", {
      uid: uid
    });
    console.log(response.data);
    history.push(`/lobby?gameCode=${response.data.gameCode}`);
  } catch (e) {
    console.log(e.response.data);
  }
}

export async function getUid() {
  let uid = localStorage.getItem("uid");
  if (uid != null) {
    return uid;
  }
  try {
    let response = await axios.post("http://192.168.43.2:5000/api/user/new");
    console.log(response.data);
    uid = response.data["uid"];
    localStorage.setItem("uid", uid);
  } catch (e) {
    console.log(e.response.data);
  }

  return uid;
}
