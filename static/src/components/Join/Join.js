import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./Join.css";

const useStyles = makeStyles({
  joinGameTextField: {
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

function Join() {
  const classes = useStyles();

  return (
    <div className="Join" style={{ height: window.innerHeight }}>
      <div className="JoinGameForm">
        <TextField
          label="Game Code"
          variant="outlined"
          className={classes.joinGameTextField}
        />
        <Link to="/">
          <button type="submit" className="Button JoinButton">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
