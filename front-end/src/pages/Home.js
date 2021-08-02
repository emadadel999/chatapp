import React, { useEffect, useState } from "react";
import socketServerConnect from "../shared/socket-io-connection";
import styled from "styled-components";
import Users from "../components/Users";
import ChatRoom from "../components/ChatRoom";
import Rooms from "../components/Rooms";
import { useSelector } from "react-redux";
import { BACKEND_SERVER } from "../shared/globals";
import { v4 as uuid } from "uuid";
import axios from "axios";
let socket = null;

const _createRoom = function (room) {
  axios
    .post("/api/rooms", room)
    .then(function (res) {})
    .catch(function (err) {});
};

const Home = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [roomId, setRoomId] = useState("");
  const [toggle, setMenuToggler] = useState(false);
  const [userStateData, setUserStateData] = useState({
    userId: "",
    isOnline: false,
    numOnline: 0,
  });
  const [newMsg, setNewMsg] = useState(null);

  useEffect(() => {
    socket = socketServerConnect(
      BACKEND_SERVER,
      setUserStateData,
      currentUser,
      setNewMsg
    );
    console.log(socket);
  }, [BACKEND_SERVER]);

  const onUserClicked = (chattedUserId) => {
    const newRoom = {
      roomName: "",
      firstUserId: currentUser._id,
      secondUserId: chattedUserId,
    };

    setRoomId("room1");
    socket.emit("roomJoin", "room1");
  };

  return (
    <Container>
      <Menu>
        <CurrentUser>{currentUser.username}</CurrentUser>
        <MenuSwitcher>
          <Switch selected={toggle} onClick={() => setMenuToggler(false)}>
            Users
          </Switch>
          <Switch selected={!toggle} onClick={() => setMenuToggler(true)}>
            Rooms
          </Switch>
        </MenuSwitcher>
        {toggle ? (
          <Rooms currentUser={currentUser} userChosenHandler={onUserClicked} />
        ) : (
          <Users
            currentUser={currentUser}
            userStateData={userStateData}
            userChosenHandler={onUserClicked}
          />
        )}
      </Menu>

      {roomId ? (
        <ChatRoom
          currentUser={currentUser}
          roomId={roomId}
          newMsg={newMsg}
          socket={socket}
        />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Menu = styled.div`
  border: 2px solid black;
  width: 20vw;
`;

const CurrentUser = styled.h1`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuSwitcher = styled.div`
  height: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Switch = styled.div`
  width: 50%;
  text-align: center;
  background-color: ${(props) => (props.selected ? "lightgrey" : "white")};
  border-style: ${(props) => (props.selected ? "none" : "solid")};
  cursor: pointer;
`;

export default Home;
