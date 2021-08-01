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
  JOIN_ROOM,
  LEAVE_ROOM,
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

export const newServerMessage = (msg, room) => {
  return {
    type: NEW_SERVER_MESSAGE,
    payload: {
      msg,
      room
    }
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

export const joinRoom = (roomId) => {
  return {
    type: JOIN_ROOM,
    payload: roomId
  };
};

export const leaveRoom = (roomId) => {
  return {
    type: LEAVE_ROOM,
    payload: roomId
  };
};
