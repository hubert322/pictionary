import React from "react";
import PropTypes from "prop-types";
import { sendSelectedWord } from "./OverlayApiSocket";
import { sendNextTurn } from "../../GameApiSocket";
import "./Overlay.css";

function Overlay(props) {
  const { gameCode, pid, artist, words, endTurnData } = props;

  function selectOverlayContent() {
    if (endTurnData !== null) {
      return (
        <>
          {endTurnData.players.map(player => (
            <p key={player._id}>
              {player.playerName}: {player.score}
            </p>
          ))}
          <button type="button" onClick={() => sendNextTurn(gameCode)}>
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

  return <div className="Overlay">{selectOverlayContent()}</div>;
}

Overlay.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  artist: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  endTurnData: PropTypes.arrayOf(PropTypes.object)
};

Overlay.defaultProps = {
  artist: null,
  endTurnData: null
};

export default Overlay;
