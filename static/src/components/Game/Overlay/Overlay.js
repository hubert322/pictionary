import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { sendSelectedWord } from "./OverlayApiSocket";
import { sendJoinGame } from "../../Home/HomeApiSocket";
import Panel from "../../Panel/Panel";
import "./Overlay.css";

function Overlay(props) {
  const {
    gameCode,
    pid,
    artist,
    words,
    endTurnData,
    onNextTurn,
    onShowResults,
    results,
    history
  } = props;

  console.log(props);
  console.log(endTurnData);

  function getPlayerName(players, pid) {
    for (const player of players) {
      if (player._id === pid) {
        return player.playerName;
      }
    }
    return null;
  }

  function selectOverlayContent() {
    if (results !== null) {
      return (
        <>
          {results.players.map((player, index) => (
            <p key={player._id}>
              #{results.rankings[index]} {player.playerName}: {player.score}
            </p>
          ))}
          <button
            type="button"
            onClick={() => {
              sendJoinGame(
                gameCode,
                pid,
                getPlayerName(results.players, pid),
                history
              );
            }}
          >
            Back to Room
          </button>
        </>
      );
    }
    if (endTurnData !== null) {
      return (
        <>
          {endTurnData.players.map(player => (
            <p key={player._id}>
              {player.playerName}: {player.score} + {player.earnedScore}
            </p>
          ))}
          {endTurnData.isEndGame ? (
            <button type="button" onClick={onShowResults}>
              Results
            </button>
          ) : (
            <button type="button" onClick={onNextTurn}>
              Next Turn
            </button>
          )}
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
  onNextTurn: PropTypes.func.isRequired,
  onShowResults: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.array),
  history: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  ).isRequired
};

Overlay.defaultProps = {
  artist: null,
  endTurnData: null,
  results: null
};

export default Overlay;
