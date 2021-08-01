import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Users from "../components/Users";
import ChatRoom from "../components/ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { joinRoom, wsConnect } from "../shared/util/redux/actions/actions";
import { BACKEND_SERVER } from "../shared/globals";
import Rooms from "../components/Rooms";

const Home = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const [isUsersMenu, setMenuSwitch] = useState(false);

  useEffect(() => {
    dispatch(wsConnect(BACKEND_SERVER));
  }, [dispatch]);

  const onUserClicked = (chattedUserId) => {
    setRoomId("room1");
    dispatch(joinRoom("room1"));
  };

  return (
    <Container>
      <Menu>
        <CurrentUser>{currentUser.username}</CurrentUser>
        <MenuSwitcher>
          {/* these stupid lines of code needs refactoring */}
          {isUsersMenu ? (
            <Switch onClick={() => setMenuSwitch(false)}>Rooms</Switch>
          ) : (
            <SelectedSwitch>Rooms</SelectedSwitch>
          )}
          {!isUsersMenu ? (
            <Switch onClick={() => setMenuSwitch(true)}>Users</Switch>
          ) : (
            <SelectedSwitch>Users</SelectedSwitch>
          )}
        </MenuSwitcher>
        {isUsersMenu ? (
          <Users currentUser={currentUser} userChosenHandler={onUserClicked} />
        ) : (
          <Rooms currentUser={currentUser} userChosenHandler={onUserClicked} />
        )}
      </Menu>

      {roomId ? <ChatRoom currentUser={currentUser} roomId={roomId} /> : null}
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
  background-color: lightgrey;
  cursor: pointer;
`;

const SelectedSwitch = styled.div`
  width: 50%;
  text-align: center;
  border-style: solid;
  cursor: pointer;
`;

export default Home;
