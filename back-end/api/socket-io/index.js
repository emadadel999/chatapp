const express = require("express");
const { model } = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const User = model("User");
let numOnlineUsers = 0;

// sockect.io connection
io.on("connection", (socket) => {
  ++numOnlineUsers;

  socket.on("addUser", (userId) => {
    console.log(numOnlineUsers, " is the number of online users");
    socket.userId = userId;

    // emit user online event
    io.emit("userOnline", {
      userId: socket.userId,
      numOnlineUsers,
      isOnline: true,
    });
  });

  socket.on("roomJoin", (roomName) => {
    socket.join(roomName);
  });

  // event to fire if a user sends a msg
  socket.on("emitClientMsg", ({ msg, room }) => {
    console.log(room);
    socket.to(room).emit("onServerMsg", msg);
  });

  // event to fire if a client disconnects from server (refresh or close or connection lost...etc)
  socket.on("disconnect", (reason) => {
    --numOnlineUsers;
    console.log("user is disconnected");
    console.log(numOnlineUsers, " is the number of online users");

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
      numOnlineUsers,
      isOnline: false,
    });
  });
});
