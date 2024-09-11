import React, { useContext, useEffect, useState } from "react";
import socketServerConnect from "../../shared/socket-io-connection";
import Users from "../../components/Users/Users";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import { BACKEND_SERVER } from "../../shared/globals";
import {
  addMsgToRoom,
  getOrCreateRoom,
} from "../../shared/api-calls/roomApi";
import { usersGetAll } from "../../shared/api-calls/userApi";
import { Socket } from "socket.io-client";
import { Message, Room, User } from "../../types/types";
import { MyRoomDispatchContext } from "../../shared/reducers/MyRoomContext";


let socket: Socket;

interface HomeProps {
  currentUser: User,
  signout: (socket: Socket) => void
}

const Home = ({ currentUser, signout }: HomeProps) => {
  const [users, setUsers] = useState<User[]>();
  const dispatch = useContext(MyRoomDispatchContext);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      usersGetAll(currentUser.id, setUsers);
      socket = socketServerConnect(
        BACKEND_SERVER,
        setUsers,
        currentUser,
      );

      socket.on("onServerMsg", ({msg, roomId}: {msg: Message, roomId: string}) => {
        console.log("onServerMsg() got message", msg);
        console.log("for room: ", roomId);
        
        if (dispatch) {
          dispatch({
            type: 'addMsg',
            msgPayload: {
              msg,
              roomId
            }
          })
        }
      });
    }
  }, [currentUser, setUsers]);

  const openRoom = (chattedUserId: string, chattedUsername: string) => {
    const newRoom = {
      roomName: `${currentUser.username}, ${chattedUsername}`,
      userIDs: [currentUser.id, chattedUserId],
      roomType: "single",
    } as Room;

    getOrCreateRoom(newRoom)
      .then((res) => {
        console.log("got Room", res.data);
        if (dispatch) {
          dispatch({
            type: 'setRoom',
            room: res.data
          })          
        }
        socket.emit("roomJoin", res.data.id);
      })
      .catch((err) => {
        console.log('getOrCreateRoom err:', err);
      });
  };

  const closeRoom = (currentRoomId?: string) => {
    if (dispatch) {
      dispatch({
        type: 'setRoom',
        room: undefined
      })      
    }
    socket.emit("roomLeave", currentRoomId);
  };

  const sendMsg = (msgText: string, roomId?: string) => {
    const newMsg = {
      content: msgText,
      senderId: currentUser.id,
      senderName: currentUser.username,
    } as Message;

    console.log("sending a new message:", newMsg);
    console.log('to room:', roomId);
    if (roomId) {
      addMsgToRoom(newMsg, roomId);
      if (dispatch) {
        dispatch({
          type: 'addMsg',
          msgPayload: {
            msg: newMsg,
            roomId
          }
        })    
      }
      socket.emit("emitClientMsg", { msg: newMsg, roomId });
    }
  };

  return (
    <div className="app__container">
      <menu className="home__menu">
        <div className="current-user__container">
          <h1 className="current-user">{currentUser.username}</h1>
          <button className="signout__btn" onClick={() => signout(socket)}>
            <img src="/images/signout.svg" alt="sign out icon"/>
          </button>
        </div>

        <Users
          currentUser={currentUser}
          users={users}
          onUserClicked={openRoom}
        />
      </menu>
      <ChatRoom
        onSendMsgClicked={sendMsg}
        onClose={closeRoom}
        currentUser={currentUser}
      />

    </div>
  );
};

export default Home;
