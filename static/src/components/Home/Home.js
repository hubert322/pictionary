import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { sendJoinGame, sendNewGame, getPid } from "./HomeApiSocket";
import { useLocalStorage } from "../../utils/hooks";
import Panel from "../Panel/Panel";
import TextField from "../TextField/TextField";
import Footer from "./Footer/Footer";
import "../App/App.css";
import "./Home.css";

function Home() {
  const [gameCode, setGameCode] = useState("");
  const [playerName, setPlayerName] = useLocalStorage("playerName", "");
  const [playerNameLabel, setPlayerNameLabel] = useState("Name");
  const [hasPlayerNameError, setHasPlayerNameError] = useState(false);
  const [gameCodeLabel, setGameCodeLabel] = useState("Game Code");
  const [hasGameCodeError, setHasGameCodeError] = useState(false);
  const pid = useRef(null);
  let history = useHistory();

  function onJoinGame() {
    if (gameCode === "" || playerName === "") {
      if (gameCode === "") {
        setHasGameCodeError(true);
        setGameCodeLabel("Game Code required");
      }
      if (playerName === "") {
        setHasPlayerNameError(true);
        setPlayerNameLabel("Name required");
      }
    } else if (typeof pid.current !== "string") {
      console.log("Waiting for promise to resolve...");
    } else {
      sendJoinGame(gameCode, pid.current, playerName, history);
    }
  }

  function onNewGame() {
    if (playerName === "") {
      setHasPlayerNameError(true);
      setPlayerNameLabel("Name required");
    } else if (typeof pid.current !== "string") {
      console.log("Waiting for promise to resolve...");
    } else {
      sendNewGame(pid.current, playerName, history);
    }
  }

  useEffect(() => {
    getPid().then(pidValue => {
      pid.current = pidValue;
    });
  }, []);

  return (
    <div className="Home">
      <Link to="/" className="HomeTitle">
        Pictionary Live
      </Link>
      <Panel className="HomeMainContainer">
        <TextField
          label={playerNameLabel}
          variant="outlined"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          error={hasPlayerNameError}
        />
        <div className="HomeJoinGameContainer">
          <TextField
            label={gameCodeLabel}
            variant="outlined"
            className="HomeJoinGameTextField"
            value={gameCode}
            onChange={e => setGameCode(e.target.value)}
            error={hasGameCodeError}
          />
          <button
            type="button"
            className="Button HomeJoinGameButton"
            onClick={onJoinGame}
          >
            Join Game
          </button>
        </div>
        <button
          type="button"
          className="Button HomeNewGameButton"
          onClick={onNewGame}
        >
          New Game
        </button>
      </Panel>
      <Footer />
    </div>
  );
}

export default Home;
