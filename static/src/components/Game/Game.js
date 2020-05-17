import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import { mediumDeviceMinWidth } from "../../utils/const";
import { useWindowSize } from "../../utils/hooks";
import { sendNextTurn } from "./GameApiSocket";
import PlayersList from "./PlayersList/PlayersList";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import Overlay from "./Overlay/Overlay";
import "./Game.css";

function Game() {
  const state = useLocation().state;
  const { gameCode, pid, ownerPid } = state;
  const [players, setPlayers] = useState(state.players);
  const [artist, setArtist] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [words, setWords] = useState([]);
  const [rankings, setRankings] = useState(new Array(players.length).fill(1));
  const [endTurnData, setEndTurnData] = useState(null);
  const [guessedCorrectPid, setGuessedCorrectPid] = useState(null);
  const [timer, setTimer] = useState(null);
  const [results, setResults] = useState(null);
  const { width } = useWindowSize();
  let history = useHistory();

  function onNextTurn() {
    sendNextTurn(gameCode);
    updatePlayersScore();
    setEndTurnData(null);
  }

  function onShowResults() {
    const [newPlayers, newRankings] = updatePlayersScore();
    setResults({
      players: newPlayers,
      rankings: newRankings
    });
  }

  function updatePlayersScore() {
    const newPlayers = players.map((player, index) => {
      const newPlayer = endTurnData.players[index];
      player["score"] = newPlayer.score + newPlayer.earnedScore;
      return player;
    });
    setPlayers(newPlayers);

    function getScore(score) {
      return score ? score : 0;
    }

    const sortedScores = players
      .map(player => getScore(player.score))
      .sort()
      .reverse();

    const newRankings = players.map(
      player => sortedScores.indexOf(getScore(player.score)) + 1
    );
    setRankings(newRankings);

    return [newPlayers, newRankings];
  }

  function getPlayersList() {
    return (
      <PlayersList
        players={players}
        pid={pid}
        ownerPid={ownerPid}
        artistPid={artist !== null ? artist._id : null}
        guessedCorrectPid={guessedCorrectPid}
        rankings={rankings}
      />
    );
  }

  function getCanvasOrOverlay() {
    if (isDrawing) {
      return (
        <Canvas
          gameCode={gameCode}
          pid={pid}
          artist={artist}
          isDrawing={isDrawing}
          words={words}
          endTurnData={endTurnData}
          onNextTurn={onNextTurn}
          timer={timer}
        />
      );
    }
    return (
      <Overlay
        gameCode={gameCode}
        pid={pid}
        artist={artist}
        words={words}
        endTurnData={endTurnData}
        onNextTurn={onNextTurn}
        onShowResults={onShowResults}
        players={players}
        results={results}
        history={history}
      />
    );
  }

  function getChatRoom() {
    return (
      <ChatRoom
        gameCode={gameCode}
        pid={pid}
        setGuessedCorrectPid={setGuessedCorrectPid}
      />
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
      setGuessedCorrectPid(null);
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
      console.log(data);
      setEndTurnData(data);
      setIsDrawing(false);
      setArtist(null);
    });

    return () => {
      socket.off("end_turn_announcement");
    };
  }, []);


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
            {getCanvasOrOverlay()}
            {getChatRoom()}
          </>
        ) : (
          <>
            {getCanvasOrOverlay()}
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
