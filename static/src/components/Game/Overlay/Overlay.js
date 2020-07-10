import React from "react";
import PropTypes from "prop-types";
import { sendSelectedWord } from "./OverlayApiSocket";
import Panel from "../../Panel/Panel";
import "../../App/App.css";
import "./Overlay.css";

function Overlay(props) {
  const {
    gameCode,
    pid,
    artist,
    words,
    endTurnData,
    endGameData,
    onBackRoom
  } = props;

  function getResults() {
    // let results = {
    //   players: []
    // };
    // for (let i = 0; i < 8; ++i) {
    //   results.players.push({
    //     _id: i,
    //     playerName: `Hurgurto${i}`,
    //     score: 3000
    //   });
    // }

    return (
      <div className="OverlayEndTurnResultsContainer">
        {endGameData.players.map((player, index) => (
          <p key={player._id} className="OverlayEndTurnResultsText">
            #{endGameData.rankings[index]} {player.playerName}: {player.score}
          </p>
        ))}
        <button
          type="button"
          className="Button OverlayEndTurnResultsButton"
          onClick={onBackRoom}
        >
          Back to Room
        </button>
      </div>
    );
  }

  function getEndTurn() {
    // let selectedWord = "Hello";
    // let endTurnData = {
    //   players: [],
    //   isEndGame: false
    // };
    // for (let i = 0; i < 8; ++i) {
    //   endTurnData.players.push({
    //     _id: i,
    //     playerName: `Hurgurto${i}`,
    //     score: 3000,
    //     earnedScore: 5000
    //   });
    // }
    return (
      <div className="OverlayEndTurnResultsContainer">
        <p className="OverlayEndTurnResultsText">
          Selected Word: {endTurnData.selectedWord}
        </p>
        {endTurnData.players.map(player => (
          <p key={player._id} className="OverlayEndTurnResultsText">
            {player.playerName}: {player.score} + {player.earnedScore}
          </p>
        ))}
        {/* {endTurnData.isEndGame ? (
          <button
            type="button"
            className="Button OverlayEndTurnResultsButton"
            onClick={onShowResults}
          >
            Results
          </button>
        ) : null} */}
      </div>
    );
  }

  function getLoading() {
    return <p>Loading...</p>;
  }

  function getArtistChoosing() {
    return <p>{artist.playerName} is choosing their word...</p>;
  }

  function getWords() {
    // let words = ["computer", "hello", "world"];
    return (
      <>
        {words.map(word => (
          <button
            type="button"
            key={word}
            className="Button OverlayWordButton"
            onClick={() => sendSelectedWord(gameCode, word)}
          >
            {word}
          </button>
        ))}
      </>
    );
  }

  function selectOverlayContent() {
    if (endGameData !== null) {
      return getResults();
    }
    if (endTurnData !== null) {
      return getEndTurn();
    }
    if (artist === null) {
      return getLoading();
    }
    if (pid !== artist._id) {
      return getArtistChoosing();
    }
    return getWords();
  }

  return <Panel className="Overlay">{selectOverlayContent()}</Panel>;
  // return <Panel className="Overlay">{getResults()}</Panel>;
}

Overlay.propTypes = {
  gameCode: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  artist: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  endTurnData: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string])
  ),
  endGameData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array])),
  onBackRoom: PropTypes.func.isRequired
};

Overlay.defaultProps = {
  artist: null,
  endTurnData: null,
  endGameData: null
};

export default Overlay;
