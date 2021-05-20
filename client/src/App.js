import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Landing from "../src/components/Landing/Landing";
import Home from "../src/components/Home/Home";
import Details from "../src/components/Details/Details";
import Create from "../src/components/Create/Create";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/details/:id?" component={Details} />
      <Route exact path="/create" component={Create} />
    </React.Fragment>
  );
}

export default App;
