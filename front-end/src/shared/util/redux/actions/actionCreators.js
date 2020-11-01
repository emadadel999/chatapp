import Axios from "axios";

import { REQUEST_AUTH, RECIEVE_AUTH, FETCH_AUTH_FAILED, RECIEVE_USER_DATA } from "./actionTypes";
import { BACKEND_SERVER } from "../../../globals";

export const requestAuthData = () => {
  return {
    type: REQUEST_AUTH,
  };
};
export const fetchAuthFailed = (error) => {
  return {
    type: FETCH_AUTH_FAILED,
    payload: error,
  };
};

export const recieveAuthData = ({ isAuth, username }) => {
  return {
    type: RECIEVE_AUTH,
    payload: {
      isAuth,
      username,
    },
  };
};

export const recieveUserData = (currentUser) => {
  return {
    type: RECIEVE_USER_DATA,
    payload: currentUser,
  };
};

export const fetchLoginRequest = (authData) => {
  return (dispatch) => {
    dispatch(requestAuthData());

    return Axios.post(`${BACKEND_SERVER}/api/login`, {
      username: authData.username,
      password: authData.password,
    })
      .then((res) => {
        dispatch(recieveAuthData({isAuth: res.data.isAuth}));
        dispatch(recieveUserData(res.data.currentUser));
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
        dispatch(recieveAuthData({isAuth: res.data.isAuth}));
        dispatch(recieveUserData(res.data.currentUser));
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch(fetchAuthFailed(error));
      });
  };
};
