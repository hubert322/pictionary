import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="Home" style={{ height: window.innerHeight }}>
      <h1>Skribbl</h1>
      <div className="MainFrame">
        <Link to="/join">
          <button type="button" className="Button JoinGameButton">
            Join Game
          </button>
        </Link>
        <Link to="/new">
          <button type="button" className="Button NewGameButton">
            New Game
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
