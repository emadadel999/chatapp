"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIo_server = void 0;
const socket_io_1 = require("socket.io");
const db_1 = require("../data/db");
const socketIo_server = function (server) {
    const io = new socket_io_1.Server(server, {
        allowEIO3: true,
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("user connected to socket.io");
        socket.on("addUser", (userId) => onAddUser(userId, socket));
        socket.on("roomJoin", (roomId) => onRoomJoin(roomId, socket));
        socket.on("roomLeave", (roomId) => onRoomLeave(roomId, socket));
        socket.on("emitClientMsg", (data) => onRecieveMsg(data, socket));
        socket.on("disconnect", (reason) => onUserDisconnect(reason, socket));
    });
};
exports.socketIo_server = socketIo_server;
function onAddUser(userId, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.data.userId = userId;
        try {
            const user = yield db_1.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isOnline: true
                }
            });
            console.log(`${user.username} went Online`);
        }
        catch (error) {
            console.log('onAddUser() error updating user:', error);
        }
        socket.broadcast.emit("userOnline", {
            userId,
            isOnline: true,
        });
    });
}
function onUserDisconnect(reason, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("user is disconnected", reason);
        const { userId } = socket.data;
        try {
            const user = yield db_1.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isOnline: false
                }
            });
            console.log(`${user.username} went offline`);
        }
        catch (error) {
            console.log('onUserDisconnect() error updating user', error);
        }
        socket.broadcast.emit("userOffline", {
            userId,
            isOnline: false,
        });
    });
}
function onRoomJoin(roomId, socket) {
    console.log(`user ${socket.data.userId} joined room ${roomId}`);
    socket.join(roomId);
}
function onRoomLeave(roomId, socket) {
    socket.leave(roomId);
}
function onRecieveMsg({ msg, roomId }, socket) {
    console.log("new message received on room:", roomId);
    console.log("message:", msg);
    socket.to(roomId).emit("onServerMsg", { msg, roomId });
}
