import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { socket } from "../../utils/socket";
import { sendEnterGame } from "./GameApiSocket";
import { sendJoinGame } from "../Home/HomeApiSocket";
import PlayersList from "./PlayersList/PlayersList";
import Canvas from "./Canvas/Canvas";
import ChatRoom from "../ChatRoom/ChatRoom";
import Overlay from "./Overlay/Overlay";
import "./Game.css";

function Game() {
  const state = useLocation().state;
  const { gameCode, pid, ownerPid, drawTime } = state;
  const [players, setPlayers] = useState(state.players);
  const [artist, setArtist] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(drawTime);
  const [rankings, setRankings] = useState(new Array(players.length).fill(1));
  const [endTurnData, setEndTurnData] = useState(null);
  const [guessedCorrectPid, setGuessedCorrectPid] = useState(null);
  const [endGameData, setEndGameData] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [currRound, setCurrRound] = useState(1);
  let history = useHistory();

  function onBackRoom() {
    function getPlayerName() {
      for (const player of players) {
        if (player._id === pid) {
          return player.playerName;
        }
      }
      return null;
    }
    sendJoinGame(gameCode, pid, getPlayerName(), history);
  }

  function updatePlayersScore() {
    if (endTurnData === null) {
      return;
    }

    setPlayers(
      players.map((player, index) => {
        const newPlayer = endTurnData.players[index];
        player["score"] = newPlayer.score + newPlayer.earnedScore;
        return player;
      })
    );

    function getScore(score) {
      return score ? score : 0;
    }
    const sortedScores = players
      .map(player => getScore(player.score))
      .sort()
      .reverse();
    setRankings(
      players.map(player => sortedScores.indexOf(getScore(player.score)) + 1)
    );
  }

  useEffect(() => {
    sendEnterGame(gameCode);
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
      console.log("got next artist");
      updatePlayersScore();
      setEndTurnData(null);
      setSelectedWord(null);
      setArtist(data.artist);
      setWords(data.words);
      setGuessedCorrectPid(null);
      setCurrRound(data.currRound);
    });

    return () => {
      socket.off("next_artist_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("selected_word_announcement", data => {
      setIsDrawing(true);
      setSelectedWord(data.selectedWord);
    });

    return () => {
      socket.off("selected_word_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("timer_announcement", data => {
      setTimer(data.time);
    });

    return () => {
      socket.off("timer_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("end_turn_announcement", data => {
      setEndTurnData(data);
      setIsDrawing(false);
    });

    return () => {
      socket.off("end_turn_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("end_game_announcement", data => {
      setEndGameData(data);
    });

    return () => {
      socket.off("end_game_announcement");
    };
  }, []);

  return (
    <div className="Game">
      <Link to="/" className="GameTitleLink">
        Pictionary Live
      </Link>
      <h2 className="GameGameCode">Game Code: {gameCode}</h2>
      <div className="GamePlayContainer">
        <div className="GameDummyPlayer" />
        <div className="GameCanvasOverlayContainer">
          <Canvas
            gameCode={gameCode}
            pid={pid}
            artist={artist}
            selectedWord={selectedWord}
            currRound={currRound}
            timer={timer}
          />
          {!isDrawing ? (
            <Overlay
              gameCode={gameCode}
              pid={pid}
              artist={artist}
              words={words}
              endTurnData={endTurnData}
              endGameData={endGameData}
              onBackRoom={onBackRoom}
            />
          ) : null}
        </div>
        <div className="GameDummyChat" />
        <div className="GamePlayersChatContainer">
          <PlayersList
            players={players}
            pid={pid}
            ownerPid={ownerPid}
            artistPid={artist !== null ? artist._id : null}
            guessedCorrectPid={guessedCorrectPid}
            rankings={rankings}
          />
          <ChatRoom
            gameCode={gameCode}
            pid={pid}
            setGuessedCorrectPid={setGuessedCorrectPid}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
