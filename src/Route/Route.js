import React from "react";
import { Switch, Route } from "react-router-dom";
import Todo from "../../src/containers/Todo";
import About from "../../src/components/About/About";
import Home from "../../src/components/Home/Home";
import Production from "../../src/containers/Production/Production";
import Monitor from "../../src/containers/Monitor/Monitor";

const RoutePart = () => {
  return (
    <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/brt" component={Todo}></Route>
      <Route path="/production" component={Production}></Route>
      <Route path="/monitor" component={Monitor}></Route>
      <Route path="/about" component={About}></Route>
    </Switch>
  );
};

export default RoutePart;
