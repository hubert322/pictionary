import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import "./Room.css";
import { playGame } from "./RoomApiSocket";

function Room() {
  const state = useLocation().state;
  const [players, setPlayers] = useState(state.players);
  const history = useHistory();
  const gameCode = state.gameCode;

  useEffect(() => {
    socket.on("join_room_announcement", data => {
      console.log(data);
      console.log(data.player);
      setPlayers(players => [...players, data.player]);
    });
  });

  return (
    <div className="Room">
      <h1>Room: {gameCode}</h1>
      <Link to="/">BACK</Link>
      <div className="PlayersContainer">
        {players.map(player => (
          <div className="player" key={player._id}>
            {player.playerName}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => playGame(gameCode, history)}>
        Play
      </button>
    </div>
  );
}

export default Room;
