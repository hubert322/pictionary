import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Select, InputLabel, FormControl } from "@material-ui/core";
import { IconContext } from "react-icons";
import { MdPerson } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import { useWindowSize } from "../../utils/hooks";
import { socket } from "../../utils/socket";
import { mediumDeviceMinWidth } from "../../utils/const";
import { playGame } from "./RoomApiSocket";
import Panel from "../Panel/Panel";
import "../App/App.css";
import "./Room.css";

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
  // const { gameCode, pid, ownerPid } = state;
  // const [players, setPlayers] = useState(state.players);
  const { gameCode } = state;
  const pid = 0;
  const ownerPid = 0;
  const [players, setPlayers] = useState(() => {
    let tmp = [];
    for (let i = 0; i < 8; ++i) {
      tmp.push({
        _id: i,
        playerName: `Hurgurto${i}`
      });
    }

    return tmp;
  });
  const [rounds, setRounds] = useState(3);
  const { width } = useWindowSize();
  const history = useHistory();

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
      <Link to="/" className="RoomTitleLink">
        Skribbl
      </Link>
      <h2>Room: {gameCode}</h2>
      <div className="RoomMainContainer">
        <Panel className="RoomPlayersContainer">
          <h3 className="RoomContainerTitle">Players</h3>
          <div className="RoomPlayersList">
            {players.map(player => (
              <div className="RoomPlayer" key={player._id}>
                <IconContext.Provider
                  value={{
                    size: width >= mediumDeviceMinWidth ? "3rem" : "2rem"
                  }}
                >
                  {player._id === ownerPid ? <FaCrown /> : <MdPerson />}
                </IconContext.Provider>
                <span className="RoomPlayerName">{player.playerName}</span>
                <span className="RoomPlayerTag">
                  {player._id === pid ? "You" : " "}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="RoomGameControlsContainer">
          <h3 className="RoomContainerTitle">Settings</h3>
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
