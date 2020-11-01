import React, { useState } from "react";
import io from "socket.io-client";

import { BACKEND_SERVER } from "../shared/globals";
import styled from "styled-components";
import Users from "../components/Users";
import ChatRoom from "../components/ChatRoom";
import { useSelector } from "react-redux";

const socket = io(BACKEND_SERVER);

const Home = () => {
  
  const [msgs, setMsgs] = useState([]);
  const [onlineUsernames, setOnlineUsernames] = useState([]);
  const [numOnlineUsers, setNumOnlineUsers] = useState(0);

  const {currentUser} = useSelector((state) => state.userReducer);
  socket.on("connect", () => {
    console.log("client connected.");
    socket.emit("addUser", currentUser.username);
  });

  socket.on("onServerMsg", (msg) => {
    console.log(msg);
    setMsgs([...msgs, msg]);
  });

  socket.on("userEntered", ({ username, numUsers }) => {
    console.log(`user ${username} entered, numOfUsers: ${numUsers}`);
    setOnlineUsernames([...onlineUsernames, username]);
    setNumOnlineUsers(numUsers);
  });

  const sendMsg = (newMsg) => {
    setMsgs([...msgs, newMsg]);
    socket.emit("emitClientMsg", newMsg);
  };

  socket.on("disconnect", () => {
    console.log("client disconnected.");
  });

  
  return (
    <Container>
      <Users onlineUsernames={onlineUsernames} numOnlineUsers={numOnlineUsers}/>
      <ChatRoom msgs={msgs} sendMsg={sendMsg} currentUser={currentUser}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;






export default Home;
