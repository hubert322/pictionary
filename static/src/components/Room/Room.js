import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Select, InputLabel, FormControl } from "@material-ui/core";
import { IconContext } from "react-icons";
import { MdPerson } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import Panel from "../Panel/Panel";
import { socket } from "../../utils/socket";
import "../App/App.css";
import "./Room.css";
import { playGame } from "./RoomApiSocket";

const useStyles = makeStyles({
  formControl: {
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
    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.38)"
    },
    "& .Mui-disabled": {
      cursor: "not-allowed"
    },
    "& .MuiOutlinedInput-root": {
      color: "white"
    },
    "& .MuiOutlinedInput-root.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.38)"
    },
    "& label": {
      color: "white"
    },
    "& label.Mui-focused": {
      color: "white"
    },
    "& label.Mui-disabled": {
      color: "rgba(255, 255, 255, 0.54)"
    },
    "& option": {
      color: "black"
    },
    "& .MuiSelect-icon": {
      fill: "white"
    },
    "& .MuiSelect-icon.Mui-disabled": {
      fill: "rgba(255, 255, 255, 0.26)"
    }
  }
});

function Room() {
  const classes = useStyles();
  const state = useLocation().state;
  const { gameCode, pid, ownerPid } = state;
  const [players, setPlayers] = useState(state.players);
  // const [players, setPlayers] = useState(() => {
  //   let tmp = [];
  //   for (let i = 0; i < 8; ++i) {
  //     tmp.push({
  //       _id: i,
  //       playerName: `Test${i}`
  //     });
  //   }

  //   return tmp;
  // });
  const [rounds, setRounds] = useState(3);
  const [currWidth, setCurrWidth] = useState(window.innerWidth);
  const history = useHistory();

  const mediumDeviceMinWidth = 768;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCurrWidth(window.innerWidth);
    });
  });

  useEffect(() => {
    socket.on("join_room_announcement", data => {
      console.log(data);
      console.log(data.player);
      setPlayers(players => [...players, data.player]);
    });
  }, []);

  useEffect(() => {
    socket.on("play_game_announcement", () => {
      history.push(`/game?gameCode=${gameCode}`, {
        gameCode: gameCode,
        pid: pid,
        players: players,
        ownerPid: ownerPid
      });
    });

    return () => {
      socket.off("play_game_announcement");
    };
  }, [gameCode, pid, players, history]);

  return (
    <div className="Room">
      <Link to="/" className="TitleLink">
        Skribbl
      </Link>
      <h2>Room: {gameCode}</h2>
      <div className="RoomMainContainer">
        <Panel className="PlayersContainer">
          <h3 className="ContainerTitle">Players</h3>
          <div className="PlayersList">
            {players.map(player => (
              <div className="Player" key={player._id}>
                <IconContext.Provider
                  value={{
                    size: currWidth >= mediumDeviceMinWidth ? "3rem" : "2rem"
                  }}
                >
                  <MdPerson />
                </IconContext.Provider>
                <span className="PlayerName">{player.playerName}</span>
                <span className="PlayerTag">
                  {player._id === ownerPid && player._id === pid
                    ? "Owner/You"
                    : player._id === ownerPid
                    ? "Owner"
                    : player._id === pid
                    ? "You"
                    : " "}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="GameControlsContainer">
          <h3 className="ContainerTitle">Settings</h3>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            disabled={pid !== ownerPid}
          >
            <InputLabel htmlFor="roundsSelector">Rounds</InputLabel>
            <Select
              native
              label="Rounds"
              value={rounds}
              onChange={e => setRounds(e.target.value)}
              inputProps={{ id: "roundsSelector" }}
            >
              <option>3</option>
              <option>5</option>
              <option>10</option>
            </Select>
          </FormControl>
          <button
            type="button"
            className="Button"
            onClick={() => playGame(gameCode, history)}
            disabled={pid !== ownerPid}
          >
            Play
          </button>
        </Panel>
      </div>
    </div>
  );
}

export default Room;
