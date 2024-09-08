import { useState } from "react";
import { saveUserData } from "../../shared/localStorage";
import { useJwt, decodeToken } from "react-jwt";
import { AuthForm as Form } from "auth-form-react";
import { login, register } from "../../shared/api-calls/authApi";

const Authenticate = ({ setLoggedIn, setCurrentUser }) => {
  const [serverError, setServerError] = useState("");
  
  const onLogin = ({ username, password }) => {
    login(username, password)
      .then((data) => {
        saveUserData(data.token);
        const tokenPaypload = decodeToken(data.token);
        setCurrentUser(tokenPaypload);
        setLoggedIn(true);
      })
      .catch((err) => setServerError(err));
  };

  const onRegister = ({ username, email, password }) => {
    register(username, email, password)
      .then((data) => {
        saveUserData(data.token);
        const tokenPaypload = decodeToken(data.token);
        setCurrentUser(tokenPaypload);
        setLoggedIn(true);
      })
      .catch((err) => setServerError(err));
  };

  return <Form onSignIn={onLogin} onSignUp={onRegister} serverError={serverError} />;
};

export default Authenticate;
