import { useState } from "react";
import { saveUserData } from "../../shared/localStorage";
import { decodeToken } from "react-jwt";
import AuthForm from "../../shared/authForm/index";
import { login, register } from "../../shared/api-calls/authApi";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
  const [serverError, setServerError] = useState("");
  const onLogin = ({ username, password }) => {
    login(username, password)
      .then((data) => {
        saveUserData(data.token);
        const decoded = decodeToken(data.token);
        setCurrentUser(decoded);
        setLoggedIn(true);
      })
      .catch((err) => setServerError(err));
  };

  const onRegister = ({ username, email, password }) => {
    register(username, email, password)
      .then((data) => {
        saveUserData(data.token);
        const decoded = decodeToken(data.token);
        setCurrentUser(decoded);
        setLoggedIn(true);
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
