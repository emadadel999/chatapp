const express = require("express");
const { check } = require("express-validator");
const mongoose = require("mongoose");
const cors = require("cors");

const authController = require("./controllers/authController");
const msgController = require("./controllers/msgController");
const usersController = require("./controllers/usersController");
const HttpError = require("./models/httpError");
const { FRONTEND_SERVER } = require("./models/globals");

const port = process.env.PORT || 5000;
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let numOnlineUsers = 0;

app.use(express.json());
app.use(cors());

/* Routes */
app.post(
  "/api/login",
  [
    check("username").notEmpty().isLength({ max: 15 }),
    check("password").notEmpty().isLength({ min: 6, max: 10 }),
  ],
  authController.login
);

app.post(
  "/api/register",
  [
    check("username").notEmpty().isLength({ max: 15 }),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty().isLength({ min: 6, max: 10 }),
  ],
  authController.register
);

app.get("/api/users", usersController.allUsers);

// sockect.io connection
io.on("connection", (socket) => {
  ++numOnlineUsers;
  console.log("user is connected");

  socket.on("addUser", (userId) => {
    console.log(numOnlineUsers, " is the number of online users");
    socket.userId = userId;
    io.emit("userOnline", {
      userId: socket.userId,
      numOnlineUsers,
    });
  });

  // event to fire if a user sends a msg
  socket.on("emitClientMsg", (data) =>
    msgController.emittedClientMsg(data, socket)
  );

  // event to fire if a client disconnects from server (refresh or close or connection lost...etc)
  socket.on("disconnect", (reason) => {
    --numOnlineUsers;
    console.log("user is connected");
    console.log(numOnlineUsers, " is the number of online users");
    socket.broadcast.emit("userOffline", {
      userId: socket.userId,
      numOnlineUsers,
    });
  });
});

// to throw error for undefined routes
app.use((req, res, next) => {
  const error = new HttpError("Cannot find this route", 404);
  throw error;
});

// to catch any error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code);
  res.json({ message: error.message });
});

// instantiate db connection
mongoose.connect(
  "mongodb://mysuperuser:123456@localhost:27017/myChatAppDb?authSource=admin",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  http.listen(port);
});
