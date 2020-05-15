import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Room from "../Room/Room";
import Game from "../Game/Game";
import "./App.css";

function App() {
  const [currHeight, setCurrHeight] = useState(window.innerHeight);

  useEffect(() => {
    setCurrHeight(window.innerHeight);
  });

  return (
    <Router>
      <div className="App" style={{ height: currHeight }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
