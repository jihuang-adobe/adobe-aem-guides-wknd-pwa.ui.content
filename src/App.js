import React from "react";
import { HashRouter, MemoryRouter, Switch, Route } from "react-router-dom";
import { Theme } from "./theme";
import Adventures from "./screens/Adventures";
import AdventureDetail from "./screens/AdventureDetail";
import Index from "./screens/Index";
import Magazine from "./screens/Magazine";
import MagazineDetail from "./screens/MagazineDetail";
import Settings from "./screens/Settings";
import TabBar from "./components/TabBar";
import { getTransformedRoute } from "./utils";

import './App.css';

export default function App() {

  const Router = window.top.location.href.includes("editor.html") ? MemoryRouter : HashRouter;

  return (
    <div id="app-container" style={styles.container}>
      <Router>
        <Switch>
          <Route path={getTransformedRoute("/adventures")}>
            <Adventures />
          </Route>
          <Route path={getTransformedRoute("/detail")}>
            <AdventureDetail />
          </Route>
          <Route path={"/magazine/:id"}>
            <MagazineDetail />
          </Route>
          <Route path={getTransformedRoute("/magazine")}>
            <Magazine />
          </Route>
          <Route path={getTransformedRoute("/settings")}>
            <Settings />
          </Route>
          <Route path={getTransformedRoute("/")}>
            <Index />
          </Route>
        </Switch>
        <TabBar />
      </Router>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    backgroundColor: Theme.colors.background,
    paddingTop: "10px",
    color: Theme.colors.text,
  },
}