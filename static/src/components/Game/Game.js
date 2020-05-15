import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import { mediumDeviceMinWidth } from "../../utils/const";
import { useWindowSize } from "../../utils/hooks";
import { sendNextTurn } from "./GameApiSocket";
import PlayersList from "./PlayersList/PlayersList";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import "./Game.css";

function Game() {
  const state = useLocation().state;
  const { gameCode, pid, ownerPid } = state;
  const [players, setPlayers] = useState(state.players);
  const [artist, setArtist] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [words, setWords] = useState([]);
  const [endTurnData, setEndTurnData] = useState(null);
  const { width } = useWindowSize();
  const history = useHistory();

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

  function onNextTurn() {
    sendNextTurn(gameCode);
    setEndTurnData(null);
  }

  function getPlayersList() {
    return (
      <PlayersList
        players={players}
        pid={pid}
        ownerPid={ownerPid}
        artistPid={artist !== null ? artist._id : 5}
      />
    );
  }

  function getCanvas() {
    return (
      <Canvas
        gameCode={gameCode}
        pid={pid}
        artist={artist}
        isDrawing={isDrawing}
        words={words}
        endTurnData={endTurnData}
        onNextTurn={onNextTurn}
      />
    );
  }

  function getChatRoom() {
    return (
      <ChatRoom gameCode={gameCode} pid={pid} addPlayerScore={addPlayerScore} />
    );
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
      <Link to="/" className="GameTitleLink">
        Skribbl
      </Link>
      <h2 className="GameGameCode">Game: {gameCode}</h2>
      <div className="GamePlayContainer">
        {width >= mediumDeviceMinWidth ? (
          <>
            {getPlayersList()}
            {getCanvas()}
            {getChatRoom()}
          </>
        ) : (
          <>
            {getCanvas()}
            <div className="GamePlayersChatContainer">
              {getPlayersList()}
              {getChatRoom()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
