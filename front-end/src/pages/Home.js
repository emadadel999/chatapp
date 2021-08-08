import React, { useEffect, useState } from "react";
import socketServerConnect from "../shared/socket-io-connection";
import styled from "styled-components";
import Users from "../components/Users";
import ChatRoom from "../components/ChatRoom";
import Rooms from "../components/Rooms";
import { useSelector } from "react-redux";
import { BACKEND_SERVER } from "../shared/globals";
import { createRoom } from "../shared/util/api-calls/room";

let socket = null;

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
  }, [currentUser]);

  const onUserClicked = (chattedUserId) => {
    const newRoom = {
      roomName: `${currentUser.username} room`,
      users: [currentUser._id, chattedUserId],
      roomType: "single",
      currUserId: currentUser._id,
      chattedUserId,
    };
    createRoom(newRoom)
      .then((res) => {
        console.log("got Room", res);
        setRoomId(res.data._id);
        socket.emit("roomJoin", res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRoomClicked = (roomId) => {
    setRoomId(roomId);
    socket.emit("roomJoin", roomId);
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
          <Rooms currentUser={currentUser} roomChosenHandler={onRoomClicked} />
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
