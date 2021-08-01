const express = require("express");
require("dotenv").config();
require("./api/data/db");
require("./api/socket-io");
const router = require("./api/routes");
const cors = require("cors");
const app = express();

const { HttpError } = require("./api/data/models");

// app.use("/node", express.static(path.join(__dirname, "node_modules")));
// app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/api", router);

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

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port", server.address().port);
});
