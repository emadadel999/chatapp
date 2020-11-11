import io from "socket.io-client";
import { getNewMessage, userOffline, userOnline } from "../actions/actions";
import {
  NEW_SERVER_MESSAGE,
  WS_CONNECT,
  WS_DISCONNECT,
} from "../actions/actionTypes";

const socketMiddleware = () => {
  let socket = null;

  const onConnect = (store) => {
    console.log("client connected.");
    const { currentUser } = store.getState().userReducer;
    socket.emit("addUser", currentUser._id);
  };

  const onUserOnline = (store, { userId, numOnlineUsers }) => {
    // console.log(
    //   `user ${userId} entered, num of online users: ${numOnlineUsers}`
    // );
    store.dispatch(userOnline(userId, numOnlineUsers));
  };
  const onUserOffline = (store, { userId, numOnlineUsers }) => {
    //console.log(`user ${userId} left, num of online users: ${numOnlineUsers}`);
    store.dispatch(userOffline(userId, numOnlineUsers));
  };

  const onDisconnect = (reason) => {
    console.log(reason, "client disconnected.");
  };

  const onNewMsg = (store, newMsg) => {
    store.dispatch(getNewMessage(newMsg));
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
