import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import "./App.css";
import Messenger from "./components/Messenger";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/messenger/login" component={Login} exact></Route>

        <Route path="/messenger/register" component={Register} exact></Route>
        <ProtectRoute path='/' component={Messenger} exact />
        
      </Switch>
    </Router>
  );
}

export default App;
