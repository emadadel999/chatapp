import { useState } from "react";
import { saveUserData } from "../../shared/localStorage";
import AuthForm from "../../shared/authForm/index";
import { login, register } from "../../shared/util/api-calls/authApi";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
  const [serverError, setServerError] = useState("");

  const onLogin = ({ username, password }) => {
    login(username, password)
      .then((userData) => {
        saveUserData(userData);
        setCurrentUser(userData.currentUser);
        setLoggedIn(userData.isAuth);
      })
      .catch((err) => setServerError(err));
  };

  const onRegister = ({ username, email, password }) => {
    register(username, email, password)
      .then((userData) => {
        saveUserData(userData);
        setCurrentUser(userData.currentUser);
        setLoggedIn(userData.isAuth);
      })
      .catch((err) => setServerError(err));
  };
  return (
    <AuthForm
      onSignIn={onLogin}
      onSignUp={onRegister}
      serverError={serverError}
    />
  );
};

export default Authenticate;
