import Axios from "axios";
import io from "socket.io-client";
import { BACKEND_SERVER } from "../../../globals";
import { getNewMessage, userOffline, userOnline } from "../actions/actions";
import {
  NEW_SERVER_MESSAGE,
  WS_CONNECT,
  WS_DISCONNECT,
} from "../actions/actionTypes";

// update user state to online or offline
const postUserState = async (url, userId, isOnline) => {
  try {
    const result = await Axios.post(url, { userId, isOnline });
    console.log(result);
  } catch (err) {
    const error = err.response ? err.response.data.message : err.message;
    console.error(error);
  }
};

const socketMiddleware = () => {
  let socket = null;

  const onConnect = (store) => {
    console.log("client connected.");
    const { currentUser } = store.getState().userReducer;
    socket.emit("addUser", currentUser._id);
  };

  const onUserOnline = (store, { userId, numOnlineUsers, isOnline }) => {
    store.dispatch(userOnline(userId, numOnlineUsers, isOnline));
    postUserState(`${BACKEND_SERVER}/api/userstate`, userId, true);
  };
  const onUserOffline = (store, { userId, numOnlineUsers, isOnline }) => {
    store.dispatch(userOffline(userId, numOnlineUsers, isOnline));
  };

  const onNewMsg = (store, newMsg) => {
    store.dispatch(getNewMessage(newMsg));
  };

  const onDisconnect = (reason) => {
    console.log(reason, "client disconnected.");
  };

  
  // the middleware part of this function
  return (store) => (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        // connect to the remote host
        socket = io(action.payload);

        socket.on("connect", () => onConnect(store));

        socket.on("disconnect", onDisconnect);

        socket.on("onServerMsg", (newMsg) => onNewMsg(store, newMsg));

        socket.on("userOnline", ({ userId, numOnlineUsers }) =>
          onUserOnline(store, { userId, numOnlineUsers })
        );
        socket.on("userOffline", ({ userId, numOnlineUsers }) =>
          onUserOffline(store, { userId, numOnlineUsers })
        );
        break;
      case WS_DISCONNECT:
        //socket = null;
        break;
      case NEW_SERVER_MESSAGE:
        socket.emit("emitClientMsg", action.payload);
        break;
      default:
        console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();
