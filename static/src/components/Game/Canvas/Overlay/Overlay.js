import React from "react";
import PropTypes from "prop-types";
import { sendSelectedWord } from "./OverlayApiSocket";
import "./Overlay.css";

function Overlay(props) {
  const { gameCode, pid, artist, words } = props;

  function selectOverlayContent() {
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
  words: PropTypes.arrayOf(PropTypes.string).isRequired
};

Overlay.defaultProps = {
  artist: null
};

export default Overlay;
