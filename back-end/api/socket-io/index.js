const { model } = require("mongoose");
const { Server } = require("socket.io");

const User = model("User");

const socketIo_server = function (server) {
  let numOnline = -1;
  const io = new Server(server, {
    allowEIO3: true,
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("user connected to socket.io");
    ++numOnline;

    socket.on("addUser", (userId) => onAddUser(userId, socket, numOnline));

    socket.on("roomJoin", (roomId) => onRoomJoin(roomId, socket));

    socket.on("roomLeave", (roomId) => onRoomLeave(roomId, socket));

    socket.on("emitClientMsg", (data) => onRecieveMsg(data, socket));
    socket.on("disconnect", (reason) => {
      --numOnline;
      onUserDisconnect(reason, socket, numOnline);
    });
  });
};

function onAddUser(userId, socket, numOnline) {
  console.log(numOnline, " is the number of online users");
  socket.userId = userId;
  User.findOneAndUpdate({ _id: userId }, { isOnline: true }, { new: true })
    .then((user) => {
      console.log(`${user.username} went Online`);
    })
    .catch((err) => console.log(err));
  socket.broadcast.emit("userOnline", {
    userId,
    numOnline,
    isOnline: true,
  });
}
function onUserDisconnect(reason, socket, numOnline) {
  console.log("user is disconnected", reason);
  console.log(numOnline, " is the number of online users");
  const { userId } = socket;
  User.findOneAndUpdate({ _id: userId }, { isOnline: false }, { new: true })
    .then((user) => {
      console.log(`${user.username} went Offline`);
    })
    .catch((err) => console.log(err));
  socket.broadcast.emit("userOffline", {
    userId: socket.userId,
    numOnline,
    isOnline: false,
  });
}

function onRoomJoin(roomId, socket) {
  socket.join(roomId);
}
function onRoomLeave(roomId, socket) {
  socket.leave(roomId);
}
function onRecieveMsg({ msg, roomId }, socket) {
  socket.to(roomId).emit("onServerMsg", { msg, roomId });
}

module.exports = socketIo_server;
