import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Room from "../Room/Room";
import Game from "../Game/Game";
import { useWindowSize } from "../../utils/hooks";
import "prevent-pull-refresh";
import "./App.css";

function App() {
  const { height } = useWindowSize();

  return (
    <Router>
      <div className="App" style={{ height: height }}>
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
