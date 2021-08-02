import io from "socket.io-client";

const socketServerConnect = function (
  serverUrl,
  setUserStateData,
  currentUser,
  setNewMsg
) {
  const socket = io(serverUrl, {
    withCredentials: true,
  });

  socket.on("connect", () => onConnect(socket, currentUser));

  socket.on("disconnect", onDisconnect);

  socket.on("onServerMsg", (newMsg) => onServerMsg(newMsg, setNewMsg));

  socket.on("userOnline", (data) => onUserOnline(data, setUserStateData));
  socket.on("userOffline", (data) => onUserOffline(data, setUserStateData));

  console.log(socket);
  return socket;
};

const onConnect = (socket, currentUser) => {
  console.log("socket connected");
  socket.emit("addUser", currentUser._id);
};

const onDisconnect = (reason) => {
  console.log(reason, "client disconnected.");
};

const onUserOnline = (data, setUserStateData) => {
  setUserStateData({
    userId: data.userId,
    isOnline: data.isOnline,
    numOnline: data.numOnline,
  });
  // postUserState(`${BACKEND_SERVER}/api/userstate`, userId, true);
};
const onUserOffline = (data, setUserStateData) => {
  console.log("signing out user data", data);
  setUserStateData({
    userId: data.userId,
    isOnline: data.isOnline,
    numOnline: data.numOnline,
  });
};

const onServerMsg = (newMsg, setNewMsg) => {
  setNewMsg(newMsg);
};

export default socketServerConnect;
