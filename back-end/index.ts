import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from './api/data/db';
import HttpError from "./api/helpers/httpError";
import router from './api/routes';
import { socketIo_server } from "./api/socket-io/index";
import { AddressInfo } from "net";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express() as Express;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


/* Routes */
app.use("/api", router);

//to throw error for undefined routes
app.use((req, res, next) => {
  const error = new HttpError("Cannot find this route", 404);
  throw error;
});

// to catch any error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code);
  res.json({ message: error.message });
});

// const express_server = app.listen(process.env.PORT, function () {
//   const addressInfo = express_server?.address() as AddressInfo
//   console.log("Listening to port", addressInfo.port);
// });

const express_server = createServer(app);

socketIo_server(express_server);


express_server.listen(process.env.PORT, function () {
  const addressInfo = express_server?.address() as AddressInfo
  console.log("Listening to port", addressInfo.port);
});

