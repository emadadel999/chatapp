import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoginRequest,
  fetchRegisterRequest,
} from "./shared/util/redux/actions/actionCreators";

import AuthForm from "./shared/authForm/index";
import Home from "./pages/Home";

function App() {
  const { isFetching, isLoggedIn, serverError, username } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  const onLogin = (values) => {
    dispatch(fetchLoginRequest(values));
  };

  const onRegister = (values) => {
    dispatch(fetchRegisterRequest(values));
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" condition={isLoggedIn} redirectRoute="/auth">
          <Home username={username}/>
        </PrivateRoute>
        <PrivateRoute exact path="/auth" condition={!isLoggedIn} redirectRoute="/">
          <AuthForm
            onSignIn={onLogin}
            onSignUp={onRegister}
            serverError={serverError}
            loading={isFetching}
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
