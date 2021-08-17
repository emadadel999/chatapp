import React, { useEffect, useState } from "react";
import socketServerConnect from "../../shared/socket-io-connection";
import {
  Container,
  Menu,
  CurrentUser,
  MenuSwitcher,
  Switch,
  CurrentUserContainer,
  SignOutBtn,
} from "./Home-styles";
import Users from "../../components/Users/Users";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import Rooms from "../../components/Rooms/Rooms";
import { BACKEND_SERVER } from "../../shared/globals";
import {
  addMsgToRoom,
  getOrCreateRoom,
  roomsGetAll,
} from "../../shared/util/api-calls/roomApi";
import { usersGetAll } from "../../shared/util/api-calls/userApi";
let socket;

const Home = ({ currentUser, signOutHandler }) => {
  const [users, setUsers] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [toggle, setMenuToggler] = useState(false);

  useEffect(() => {
    usersGetAll(currentUser._id, setUsers);
    roomsGetAll(currentUser._id, setRooms);
    socket = socketServerConnect(
      BACKEND_SERVER,
      setUsers,
      currentUser,
      setRooms,
      setCurrentRoom
    );
  }, [currentUser]);

  const userChosenHandler = (chattedUserId, chattedUsername) => {
    const newRoom = {
      roomName: `${currentUser.username}, ${chattedUsername}`,
      users: [currentUser._id, chattedUserId],
      roomType: "single",
    };
    getOrCreateRoom(newRoom)
      .then((res) => {
        console.log("got Room", res);
        setCurrentRoom(res.data);
        socket.emit("roomJoin", res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const roomChosenHandler = (currentRoom) => {
    setCurrentRoom(currentRoom);
    socket.emit("roomJoin", currentRoom._id);
  };

  const ChatRoomClosedHandler = (currentRoomId) => {
    setCurrentRoom(null);
    socket.emit("roomLeave", currentRoomId);
  };

  const msgSentHandler = (msgText) => {
    const newMsg = {
      text: msgText,
      senderId: currentUser._id,
      senderName: currentUser.username,
      isSent: true,
      sentDate: Date.now(),
    };
    addMsgToRoom(newMsg, currentRoom._id);
    setCurrentRoom({
      ...currentRoom,
      messages: [...currentRoom.messages, newMsg],
    });
    console.log(currentRoom);
    socket.emit("emitClientMsg", { msg: newMsg, roomId: currentRoom._id });
  };

  return (
    <Container>
      <Menu>
        <CurrentUserContainer>
          <CurrentUser>{currentUser.username}</CurrentUser>
          <SignOutBtn onClick={() => signOutHandler(socket)}>
            Sign out
          </SignOutBtn>
        </CurrentUserContainer>

        <MenuSwitcher>
          <Switch selected={toggle} onClick={() => setMenuToggler(false)}>
            Users
          </Switch>
          <Switch selected={!toggle} onClick={() => setMenuToggler(true)}>
            Rooms
          </Switch>
        </MenuSwitcher>
        {toggle ? (
          <Rooms
            currentUser={currentUser}
            rooms={rooms}
            onRoomClicked={roomChosenHandler}
          />
        ) : (
          <Users
            currentUser={currentUser}
            users={users}
            onUserClicked={userChosenHandler}
          />
        )}
      </Menu>

      {currentRoom ? (
        <ChatRoom
          room={currentRoom}
          onSendMsgClicked={msgSentHandler}
          onClose={ChatRoomClosedHandler}
        />
      ) : null}
    </Container>
  );
};

export default Home;
