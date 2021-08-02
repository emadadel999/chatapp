const { model } = require("mongoose");
const { Server } = require("socket.io");

const User = model("User");

const socketIo_server = function (server) {
  let numOnline = 0;
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

    socket.on("addUser", (userId) => onAddUser(io, userId, socket, numOnline));

    socket.on("roomJoin", (roomName) =>
      onRoomJoin(io, roomName, socket, numOnline)
    );

    // event to fire if a user sends a msg
    socket.on("emitClientMsg", (data) =>
      onRecieveMsg(io, data, socket, numOnline)
    );

    // event to fire if a client disconnects from server (refresh or close or connection lost...etc)
    socket.on("disconnect", (reason) => {
      --numOnline;
      onUserDisconnect(io, reason, socket, numOnline);
    });
  });
};

function onAddUser(io, userId, socket, numOnline) {
  console.log(numOnline, " is the number of online users");
  socket.userId = userId;
  User.findOneAndUpdate(
    { _id: userId },
    { isOnline: true },
    { new: true },
    (err, user) => {
      console.log(user);
    }
  );
  // emit user online event
  io.emit("userOnline", {
    userId,
    numOnline,
    isOnline: true,
  });
}
function onUserDisconnect(io, reason, socket, numOnline) {
  console.log("user is disconnected", reason);
  console.log(numOnline, " is the number of online users");

  User.findOneAndUpdate(
    { _id: socket.userId },
    { isOnline: false },
    { new: true },
    (err, user) => {
      console.log(user);
    }
  );
  socket.broadcast.emit("userOffline", {
    userId: socket.userId,
    numOnline,
    isOnline: false,
  });
}

function onRoomJoin(io, roomName, socket, numOnline) {
  socket.join(roomName);
}
function onRecieveMsg(io, { msg, room }, socket, numOnline) {
  console.log(room);
  socket.to(room).emit("onServerMsg", msg);
}

module.exports = socketIo_server;
