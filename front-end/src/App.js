import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Home from "./pages/Home/Home";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Home currentUser={currentUser} />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/auth"
          condition={!isLoggedIn}
          redirectRoute="/"
        >
          <Authenticate
            setLoggedIn={setLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, condition, redirectRoute, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectRoute,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
