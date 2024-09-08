import { Socket, Server, DisconnectReason } from "socket.io";
import { prisma } from '../data/db';
import { IncomingMessage, ServerResponse } from "http";
import { Server as HttpServer }  from "http";
import { Message } from "@prisma/client";


interface ServerToClientEvents {
  userOnline: ({userId, isOnline}:{userId: string, isOnline: boolean}) => void;
  userOffline: ({userId, isOnline}:{userId: string, isOnline: boolean}) => void;
  onServerMsg: (msg: Message, roomId: string) => void; 
}

interface ClientToServerEvents {
  addUser: (userId: string) => void;
  roomJoin: (roomId: string) => void;
  roomLeave: (roomId: string) => void; 
  emitClientMsg: ({msg, roomId}: {msg: Message, roomId: string}) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
}

export const socketIo_server = function (server: HttpServer) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
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

async function onAddUser(userId: string, socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
  socket.data.userId = userId;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isOnline: true
      }
    });
    console.log(`${user.username} went Online`);
  } catch (error) {
    console.log('onAddUser() error updating user:', error);
  }
  socket.broadcast.emit("userOnline", {
    userId,
    isOnline: true,
  });
}
async function onUserDisconnect(reason: DisconnectReason, socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
  console.log("user is disconnected", reason);
  const { userId } = socket.data;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isOnline: false
      }
    });
    console.log(`${user.username} went offline`);
  } catch (error) {
    console.log('onUserDisconnect() error updating user', error);
  }
  socket.broadcast.emit("userOffline", {
    userId,
    isOnline: false,
  });
}

function onRoomJoin(roomId: string, socket: Socket) {
  console.log(`user ${socket.data.userId} joined room ${roomId}`);
  
  socket.join(roomId);
}
function onRoomLeave(roomId: string, socket: Socket) {
  socket.leave(roomId);
}
function onRecieveMsg({ msg, roomId }: {msg: Message, roomId: string}, socket: Socket) {
  console.log("new message received on room:", roomId);
  console.log("message:", msg)
  
  socket.to(roomId).emit("onServerMsg", { msg, roomId });
}
