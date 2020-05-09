import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../App/App.css";
import "./Home.css";

const useStyles = makeStyles({
  textField: {
    margin: "5px",
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
  let history = useHistory();

  async function joinGame() {
    try {
      let response = await axios.patch(
        "http://192.168.43.2:5000/api/lobby/join",
        {
          gameCode: gameCode,
          uid: "2000"
        }
      );
      console.log(response.data);
      history.push(`/lobby?gameCode=${gameCode}`);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function newGame() {
    try {
      let response = await axios.post(
        "http://192.168.43.2:5000/api/lobby/new",
        {
          uid: "3000"
        }
      );
      console.log(response.data);
      history.push(`/lobby?gameCode=${response.data.gameCode}`);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <div className="Home" style={{ height: window.innerHeight }}>
      <h1>Skribbl</h1>
      <div className="MainFrame">
        <TextField
          label="Name"
          variant="outlined"
          className={classes.textField}
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
            onClick={joinGame}
          >
            Join Game
          </button>
        </div>
        <button
          type="button"
          className="Button NewGameButton"
          onClick={newGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default Home;
