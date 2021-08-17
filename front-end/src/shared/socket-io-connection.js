import io from "socket.io-client";

const socketServerConnect = function (
  serverUrl,
  setUsers,
  currentUser,
  setRooms,
  setCurrentRoom
) {
  const socket = io(serverUrl, {
    withCredentials: true,
  });

  socket.on("connect", () => onConnect(socket, currentUser));

  socket.on("disconnect", onDisconnect);

  socket.on("onServerMsg", (newMsg) =>
    onServerMsg(newMsg, setRooms, setCurrentRoom)
  );

  socket.on("userOnline", (data) => onUserOnline(data, setUsers));
  socket.on("userOffline", (data) => onUserOffline(data, setUsers));

  return socket;
};

const onConnect = (socket, currentUser) => {
  console.log("socket connected");
  socket.emit("addUser", currentUser._id);
};

const onDisconnect = (reason) => {
  console.log(reason, "client disconnected.");
};

const onUserOnline = (data, setUsers) => {
  setUsers((prevUsers) => {
    const userToUpdate = prevUsers.find((u) => u._id === data.userId);
    if (userToUpdate) {
      userToUpdate.isOnline = data.isOnline;
      console.log("userToUpdateState", userToUpdate);
      return [...prevUsers];
    }
    return prevUsers;
  });
};
const onUserOffline = (data, setUsers) => {
  console.log("user signed out", data);
  setUsers((prevUsers) => {
    const userToUpdate = prevUsers.find((u) => u._id === data.userId);
    if (userToUpdate) {
      userToUpdate.isOnline = data.isOnline;
      console.log("userToUpdateState", userToUpdate);
      return [...prevUsers];
    }
    return prevUsers;
  });
};

const onServerMsg = ({ msg, roomId }, setRooms, setCurrentRoom) => {
  setRooms((prevRooms) => {
    const room = prevRooms.find((r) => r._id === roomId);
    if (room) {
      room.messages.push(msg);
    }
    return { ...prevRooms };
  });
  setCurrentRoom((prevRoom) => {
    if (prevRoom._id === roomId) {
      prevRoom.messages.push(msg);
    }
    return { ...prevRoom };
  });
};

export default socketServerConnect;
