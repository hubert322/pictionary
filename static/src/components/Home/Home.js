import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { joinGame, newGame, getPid } from "./HomeApiSocket";
import { useLocalStorage } from "../../utils/hooks";
import "../App/App.css";
import "./Home.css";
import Panel from "../Panel/Panel";
import TextField from "../TextField/TextField";

function Home() {
  const [gameCode, setGameCode] = useState("");
  const [playerName, setPlayerName] = useLocalStorage("playerName", "");
  const [playerNameLabel, setPlayerNameLabel] = useState("Name");
  const [hasPlayerNameError, setHasPlayerNameError] = useState(false);
  const [gameCodeLabel, setGameCodeLabel] = useState("Game Code");
  const [hasGameCodeError, setHasGameCodeError] = useState(false);
  const pid = useRef(getPid());
  let history = useHistory();

  function onJoinGame() {
    if (gameCode === "") {
      setHasGameCodeError(true);
      setGameCodeLabel("Game Code required");
    } else {
      joinGame(gameCode, pid.current, playerName, history);
    }
  }

  function onNewGame() {
    if (playerName === "") {
      setHasPlayerNameError(true);
      setPlayerNameLabel("Name required");
    } else {
      newGame(pid.current, playerName, history);
    }
  }

  return (
    <div className="Home">
      <Link to="/" className="HomeTitle">
        Skribbl
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
    </div>
  );
}

export default Home;
