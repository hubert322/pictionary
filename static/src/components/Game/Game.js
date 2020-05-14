import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import { sendEnterGame } from "./GameApiSocket";
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
  const [artist, setArtist] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [words, setWords] = useState([]);
  const history = useHistory();
  const gameCode = state.gameCode;
  const pid = state.pid;

  // const gameCode = state.gameCode;

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
    sendEnterGame(gameCode);
  }, [gameCode]);

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
