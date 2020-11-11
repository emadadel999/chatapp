import {
  REQUEST_AUTH,
  RECIEVE_AUTH,
  FETCH_AUTH_FAILED,
  RECIEVE_USER_DATA,
  WS_CONNECT,
  WS_DISCONNECT,
  GET_NEW_MESSAGE,
  USER_ONLINE,
  USER_OFFLINE,
  NEW_SERVER_MESSAGE,
} from "./actionTypes";

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

export const recieveAuthData = (isAuth) => {
  return {
    type: RECIEVE_AUTH,
    payload: isAuth,
  };
};

export const recieveUserData = (currentUser) => {
  return {
    type: RECIEVE_USER_DATA,
    payload: currentUser,
  };
};

export const wsConnect = (url) => {
  return {
    type: WS_CONNECT,
    payload: url
  };
};

export const wsDisconnect = () => {
  return {
    type: WS_DISCONNECT,
  };
};

export const newServerMessage = (msg) => {
  return {
    type: NEW_SERVER_MESSAGE,
    payload: msg
  };
};

export const getNewMessage = (msg) => {
  return {
    type: GET_NEW_MESSAGE,
    payload: msg
  };
};

export const userOnline = (userId, numOfOnlineUsers) => {
  return {
    type: USER_ONLINE,
    payload: {
        userId,
        numOfOnlineUsers
    }
  };
};
export const userOffline = (userId, numOfOnlineUsers) => {
  return {
    type: USER_OFFLINE,
    payload: {
        userId,
        numOfOnlineUsers
    }
  };
};
