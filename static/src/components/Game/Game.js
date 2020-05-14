import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import { sendNextTurn } from "./GameApiSocket";
import { socket } from "../../utils/socket";
import "./Game.css";

function Game() {
  const state = useLocation().state;
  const [players, setPlayers] = useState(state.players);
  const [artist, setArtist] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [words, setWords] = useState([]);
  const [endTurnData, setEndTurnData] = useState(null);
  const history = useHistory();
  const gameCode = state.gameCode;
  const pid = state.pid;

  function addPlayerScore(pid, score) {
    console.log(pid, score);
    console.log(players);
    setPlayers(
      players.map(player => {
        if (player._id !== pid) {
          return player;
        }
        player.score = score;
        return player;
      })
    );
    console.log(players);
  }

  useEffect(() => {
    sendNextTurn(gameCode);
  }, []);

  useEffect(() => {
    socket.on("player_disconnect", data => {
      setPlayers(players.filter(player => player._id !== data.player._id));
    });

    return () => {
      socket.off("player_disconnect");
    };
  }, [players]);

  useEffect(() => {
    socket.on("next_artist_announcement", data => {
      console.log(data.artist.playerName);
      setArtist(data.artist);
      setWords(data.words);
      setEndTurnData(null);
    });

    return () => {
      socket.off("next_artist_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("selected_word_announcement", () => {
      setIsDrawing(true);
    });

    return () => {
      socket.off("selected_word_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("end_turn_announcement", data => {
      setEndTurnData(data);
      setIsDrawing(false);
      setArtist(null);
    });

    return () => {
      socket.off("end_turn_announcement");
    };
  });

  return (
    <div className="Game">
      <h1>Game: {gameCode}</h1>
      <Link to="/">BACK</Link>
      <div className="GamePlayContainer">
        <div className="PlayersContainer">
          {players.map(player => (
            <div className="player" key={player._id}>
              {player.playerName}: {player.score ? player.score : 0}
            </div>
          ))}
        </div>
        <Canvas
          gameCode={gameCode}
          pid={pid}
          artist={artist}
          isDrawing={isDrawing}
          words={words}
          endTurnData={endTurnData}
        />
        <ChatRoom
          gameCode={gameCode}
          pid={pid}
          addPlayerScore={addPlayerScore}
        />
      </div>
    </div>
  );
}

export default Game;
