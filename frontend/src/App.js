import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

//routes works fine but I'll copy them here to make work with auth-context easier and not allow user to enter some pages when not logged in
import Routes from "./routes";

import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login.js";
import Events from "./pages/Events.js";
import Bookings from "./pages/Bookings.js";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/auth-context";
import { useState } from "react";

function App() {
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionUserId, setSessionUserId] = useState(null);

  const loginFunction = (token, userId, tokenExpiration) => {
    setSessionToken(token);
    setSessionUserId(userId);
  };

  const logoutFunction = () => {
    setSessionToken(null);
    setSessionUserId(null);
  };

  return (
    <>
      <Router>
        <AuthContext.Provider
          value={{
            token: sessionToken,
            userId: sessionUserId,
            login: loginFunction,
            logout: logoutFunction,
          }}
        >
          <Navbar />

          <Switch>
            {!sessionToken && <Route path="/login" component={Login} exact />}
            <Route path="/events" component={Events} exact />
            {sessionToken && (
              <Route path="/bookings" component={Bookings} exact />
            )}
            {sessionToken && <Redirect to="/events" />}
            <Redirect to="/" />
          </Switch>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
