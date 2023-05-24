import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavBar from "./NavBar/navbar";
import Login from "./page/Login/login";

//This "/" path is not used
const InvalidPage = () => {
  return <Redirect to="/login" />;
};

function Dashboardqlgv () { 
    return (
      <Router>
        <Switch>
          <Route path="/home" component={NavBar} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={InvalidPage} />
        </Switch>
      </Router>
    );
}

export default Dashboardqlgv;
