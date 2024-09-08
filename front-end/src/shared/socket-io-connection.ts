import io, { Socket } from "socket.io-client";
import { Message, Room, User } from "../types/types";

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



const socketServerConnect = function (
  serverUrl: string,
  setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>,
  currentUser: User,
) {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverUrl, {
    withCredentials: true,
  });

  socket.on("connect", () => onConnect(socket, currentUser));

  socket.on("disconnect", onDisconnect);

  socket.on("userOnline", (data) => onUserOnline(data, setUsers));
  socket.on("userOffline", (data) => onUserOffline(data, setUsers));

  return socket;
};

const onConnect = (socket: Socket, currentUser: User) => {
  console.log("socket connected");
  socket.emit("addUser", currentUser.id);
};

const onDisconnect = (reason: any) => {
  console.log(reason, "client disconnected.");
};


interface UserOnlineData {userId: string, isOnline: boolean}

const onUserOnline = (data: UserOnlineData, setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>) => {
  setUsers((prevUsers) => {
    if (prevUsers) {
      const userToUpdate = prevUsers.find((u) => u.id === data.userId);
      if (userToUpdate) {
        userToUpdate.isOnline = data.isOnline;
        console.log("userToUpdateState", userToUpdate);
        return [...prevUsers];
      }      
    }
    return prevUsers;
  });
};
const onUserOffline = (data: UserOnlineData, setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>) => {
  console.log("user signed out", data);
  setUsers((prevUsers) => {
    if (prevUsers) {
      const userToUpdate = prevUsers.find((u) => u.id === data.userId);
      if (userToUpdate) {
        userToUpdate.isOnline = data.isOnline;
        console.log("userToUpdateState", userToUpdate);
        return [...prevUsers];
      }      
    }
    return prevUsers;
  });
};

export default socketServerConnect;
