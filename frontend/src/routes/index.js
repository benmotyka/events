import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/Login.js";
import Events from "../pages/Events.js";
import Bookings from "../pages/Bookings.js";
import Home from "../pages/Home.js";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/events" component={Events} exact />
      <Route path="/bookings" component={Bookings} exact />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
