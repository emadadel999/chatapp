const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./api/data/db");
const router = require("./api/routes");
const app = express();
const socketIo_server = require("./api/socket-io/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const HttpError = require("./api/helpers/httpError");

/* Routes */
app.use("/api", router);

// //to throw error for undefined routes
// app.use((req, res, next) => {
//   const error = new HttpError("Cannot find this route", 404);
//   throw error;
// });

// // to catch any error
// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code);
//   res.json({ message: error.message });
// });

const express_server = app.listen(process.env.PORT, function () {
  console.log("Listening to port", express_server.address().port);
});

socketIo_server(express_server);
