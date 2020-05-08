import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ height: window.innerHeight }}>
      <h1>Skribbl</h1>
      <div className="MainFrame">
        <form method="GET" action="https:google.com">
          <input type="submit" value="Join Game" className="JoinGameButton" />
        </form>
        <form method="GET" action="https:google.com">
          <input type="submit" value="New Game" className="NewGameButton" />
        </form>
      </div>
    </div>
  );
}

export default App;
