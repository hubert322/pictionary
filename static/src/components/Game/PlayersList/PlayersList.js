import React, { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { IconContext } from "react-icons";
import { MdPerson } from "react-icons/md";
import { FaCrown, FaPaintBrush } from "react-icons/fa";
import { useWindowSize } from "../../../utils/hooks";
import { mediumDeviceMinWidth } from "../../../utils/const";
import Panel from "../../Panel/Panel";
import "./PlayersList.css";

function PlayerList(props) {
  const { players, pid, ownerPid, artistPid, guessedCorrectPid } = props;
  const [rankings, setRankings] = useState(new Array(players.length).fill(1));
  const { width } = useWindowSize();

  function getScore(score) {
    return score ? score : 0;
  }

  useEffect(() => {
    const sortedScores = players
      .map(player => getScore(player.score))
      .sort()
      .reverse();
    setRankings(
      players.map(player => sortedScores.indexOf(getScore(player.score)) + 1)
    );
  }, [players]);

  console.log(players);
  console.log(ownerPid);

  return (
    <Panel className="PlayersList">
      {players.map(({ playerName, _id, score }, index) => (
        <div
          className="PlayersListPlayer"
          key={_id}
          style={{
            backgroundColor:
              _id === guessedCorrectPid ? "rgb(35, 231, 17)" : "transparent"
          }}
        >
          <div className="PlayersListPlayerRankingIcon">
            <span className="PlayersListRanking">#{rankings[index]}</span>
            <IconContext.Provider
              value={{
                size: width >= mediumDeviceMinWidth ? "1.8rem" : "1.5rem"
              }}
            >
              {_id === ownerPid ? <FaCrown /> : <MdPerson />}
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                size: width >= mediumDeviceMinWidth ? "1.5rem" : "1.2rem"
              }}
            >
              {_id === artistPid ? <FaPaintBrush /> : null}
            </IconContext.Provider>
          </div>
          <span className="PlayersListPlayerName">
            {playerName}
            {pid === _id ? " (You)" : null}: {getScore(score)}
          </span>
        </div>
      ))}
    </Panel>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  pid: PropTypes.string.isRequired,
  ownerPid: PropTypes.string.isRequired,
  artistPid: PropTypes.string,
  guessedCorrectPid: PropTypes.string
};

PlayerList.defaultProps = {
  artistPid: null,
  guessedCorrectPid: null
};

export default PlayerList;
