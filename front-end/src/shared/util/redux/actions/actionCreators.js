import Axios from "axios";

import { BACKEND_SERVER } from "../../../globals";
import {
  fetchAuthFailed,
  recieveAuthData,
  recieveUserData,
  requestAuthData,
} from "./actions";

export const fetchLoginRequest = (authData) => {
  return (dispatch) => {
    dispatch(requestAuthData());

    return Axios.post(`${BACKEND_SERVER}/api/login`, {
      username: authData.username,
      password: authData.password,
    })
      .then((res) => {
        dispatch(recieveUserData(res.data.currentUser));
        dispatch(recieveAuthData(res.data.isAuth));
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch(fetchAuthFailed(error));
      });
  };
};

export const fetchRegisterRequest = (authData) => {
  return (dispatch) => {
    dispatch(requestAuthData());

    return Axios.post(`${BACKEND_SERVER}/api/register`, {
      username: authData.username,
      email: authData.email,
      password: authData.password,
    })
      .then((res) => {
        dispatch(recieveUserData(res.data.currentUser));
        dispatch(recieveAuthData(res.data.isAuth));
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch(fetchAuthFailed(error));
      });
  };
};
