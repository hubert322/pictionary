import React, { useState, useEffect, useRef } from "react";
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
  const [guessedCorrectPids, setGuessedCorrectPids] = useState({});
  const [endGameData, setEndGameData] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [currRound, setCurrRound] = useState(1);
  const chatRoomRef = useRef(null);
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

  function updatePlayersScore(players) {
    setPlayers(
      players.map(player => {
        player.score = player.score + player.earnedScore;
        return player;
      })
    );
  }

  function addGuessedCorrectPid(pid) {
    setGuessedCorrectPids(guessedCorrectPids => {
      guessedCorrectPids[pid] = true;
      return guessedCorrectPids;
    });
  }

  useEffect(() => {
    sendEnterGame(gameCode);
  }, []);

  useEffect(() => {
    socket.on("next_artist_announcement", data => {
      console.log("got next artist");
      console.log(data);
      updatePlayersScore(data.players);
      setRankings(data.rankings);
      setEndTurnData(null);
      setSelectedWord(null);
      setArtist(data.artist);
      setWords(data.words);
      setGuessedCorrectPids({});
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

  useEffect(() => {
    socket.on("disconnect_announcement", data => {
      console.log(data);
    });

    return () => {
      socket.off("disconnect_announcement");
    };
  }, []);

  useEffect(() => {
    socket.on("disconnect_announcement", data => {
      console.log(data);
      setPlayers(data.players);
      setRankings(data.rankings);
      console.log(chatRoomRef);
      console.log(chatRoomRef.current);
      let message = `${data.playerName} has disconnected`;
      let status = "Disconnected";
      chatRoomRef.current.addMessage(message, status);
    });

    return () => {
      socket.off("disconnect_announcement");
    };
  }, [chatRoomRef]);

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
            guessedCorrectPids={guessedCorrectPids}
            rankings={rankings}
          />
          <ChatRoom
            gameCode={gameCode}
            pid={pid}
            addGuessedCorrectPid={addGuessedCorrectPid}
            ref={chatRoomRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
