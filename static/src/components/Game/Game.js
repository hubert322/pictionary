import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import { socket } from "../../utils/socket";
import "./Game.css";

function Game() {
  const state = useLocation().state;
  // const state = {
  //   players: [
  //     {
  //       _id: "1",
  //       playerName: "Player1"
  //     },
  //     {
  //       _id: "2",
  //       playerName: "Player2"
  //     }
  //   ],
  //   gameCode: "LMAO"
  // }
  const [players, setPlayers] = useState(state.players);
  const history = useHistory();
  const gameCode = state.gameCode;
  const pid = state.pid;

  // const gameCode = state.gameCode;

  useEffect(() => {
    socket.on("player_disconect", data => {
      setPlayers(players.filter(player => player._id !== data.player._id));
    });

    return () => {
      socket.off("player_disconnect");
    };
  }, []);

  return (
    <div className="Game">
      <h1>Game: {gameCode}</h1>
      <Link to="/">BACK</Link>
      <div className="GamePlayContainer">
        <div className="PlayersContainer">
          {players.map(player => (
            <div className="player" key={player._id}>
              {player.playerName}
            </div>
          ))}
        </div>
        <Canvas />
        <ChatRoom gameCode={gameCode} pid={pid} />
      </div>
    </div>
  );
}

export default Game;
