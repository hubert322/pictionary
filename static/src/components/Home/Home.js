import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { joinGame, newGame, getPid } from "./HomeApiSocket";
import { useLocalStorage } from "../../utils/hooks";
import "../App/App.css";
import "./Home.css";

const useStyles = makeStyles({
  textField: {
    margin: "7px",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f64f59"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c471ed"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#12c2e9"
    },
    "& .MuiOutlinedInput-root": {
      color: "white"
    },
    "& label": {
      color: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    }
  }
});

function Home() {
  const classes = useStyles();
  const [gameCode, setGameCode] = useState("");
  const [playerName, setPlayerName] = useLocalStorage("playerName", "");
  let history = useHistory();
  const pid = getPid();

  return (
    <div className="Home" style={{ height: window.innerHeight }}>
      <h1>Skribbl</h1>
      <div className="MainFrame">
        <TextField
          label="Name"
          variant="outlined"
          className={classes.textField}
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />
        <div className="JoinGameContainer">
          <TextField
            label="Game Code"
            variant="outlined"
            className={`${classes.textField} JoinGameTextField`}
            value={gameCode}
            onChange={e => setGameCode(e.target.value)}
          />
          <button
            type="button"
            className="Button JoinGameButton"
            onClick={() => joinGame(gameCode, pid, playerName, history)}
          >
            Join Game
          </button>
        </div>
        <button
          type="button"
          className="Button NewGameButton"
          onClick={() => newGame(pid, playerName, history)}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default Home;
