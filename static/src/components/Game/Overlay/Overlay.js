import React from "react";
import PropTypes from "prop-types";
import { sendSelectedWord } from "./OverlayApiSocket";
import Panel from "../../Panel/Panel";
import "./Overlay.css";

function Overlay(props) {
  const { gameCode, pid, artist, words, endTurnData, onNextTurn } = props;

  console.log(props);
  console.log(endTurnData);

  function selectOverlayContent() {
    if (endTurnData !== null) {
      return (
        <>
          {endTurnData.players.map(player => (
            <p key={player._id}>
              {player.playerName}: {player.score} + {player.earnedScore}
            </p>
          ))}
          <button type="button" onClick={onNextTurn}>
            Next Turn
          </button>
        </>
      );
    }
    if (artist == null) {
      return "Loading...";
    }
    if (pid !== artist._id) {
      return `${artist.playerName} is currently choosing their word...`;
    }
    return (
      <>
        {words.map(word => (
          <button
            type="button"
            key={word}
            onClick={() => sendSelectedWord(gameCode, word)}
          >
            {word}
          </button>
        ))}
      </>
    );
  }

  return <Panel className="Overlay">{selectOverlayContent()}</Panel>;
}

Overlay.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  artist: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  endTurnData: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  ),
  onNextTurn: PropTypes.func.isRequired
};

Overlay.defaultProps = {
  artist: null,
  endTurnData: null
};

export default Overlay;
