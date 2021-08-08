import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
// import {
//   fetchLoginRequest,
//   fetchRegisterRequest,
// } from "./shared/util/redux/actions/actionCreators";

import AuthForm from "./shared/authForm/index";
import Home from "./pages/Home";
import { BACKEND_SERVER } from "./shared/globals";
import Axios from "axios";
import { recieveUserData } from "./shared/util/redux/actions/actions";
// import { recieveUserData } from "./shared/util/redux/actions/actionTypes";

function App() {
  // const { isFetching, isLoggedIn, serverError } = useSelector(
  //   (state) => state.authReducer
  // );
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState("");

  const onLogin = ({ username, password }) => {
    Axios.post(`${BACKEND_SERVER}/api/login`, {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log(res);
        dispatch(recieveUserData(res.data.currentUser, true));
        setLoggedIn(true);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        console.log(error);
        setServerError(error);
      });
  };

  const onRegister = ({ username, email, password }) => {
    return Axios.post(`${BACKEND_SERVER}/api/register`, {
      username: username,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        dispatch(recieveUserData(res.data.currentUser, true));
        setLoggedIn(true);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        console.log(error);
        setServerError(error);
      });
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          condition={isLoggedIn}
          redirectRoute="/auth"
        >
          <Home />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/auth"
          condition={!isLoggedIn}
          redirectRoute="/"
        >
          <AuthForm
            onSignIn={onLogin}
            onSignUp={onRegister}
            serverError={serverError}
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
