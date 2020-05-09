import React from "react";
import { Link } from "react-router-dom";
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
          />
          <Link to="/api/lobby/join" className="JoinGameLink">
            <button type="button" className="Button JoinGameButton">
              Join Game
            </button>
          </Link>
        </div>
        <Link to="/lobby" className="NewGameLink">
          <button type="button" className="Button NewGameButton">
            New Game
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
