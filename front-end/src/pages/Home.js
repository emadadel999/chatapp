import React, { useState } from "react";
import io from "socket.io-client";

import { BACKEND_SERVER } from "../shared/globals";
import styled from "styled-components";

const Home = ({ username }) => {
  const [newMsg, setNewMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [onlineUsernames, setOnlineUsernames] = useState([]);
  const [numOnlineUsers, setNumOnlineUsers] = useState(0);

  const socket = io(BACKEND_SERVER);

  socket.on("connect", () => {
    console.log("client connected.");
    socket.emit("addUser", username);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected.");
  });

  socket.on("onServerMsg", (data) => {
    setMsgs([...msgs, data.message]);
  });

  socket.on("userEntered", ({ username, numUsers }) => {
    console.log(username);
    console.log(numUsers);
    setOnlineUsernames([...onlineUsernames, username]);
    setNumOnlineUsers(numUsers);
  });

  const sendMsg = () => {
    socket.emit("emitClientMsg", {
      text: newMsg,
      senderId: "",
      recieverId: "",
      sentDate: "",
      deliveredDate: "",
      readDate: "",
    });
  };
  return (
    <Container>
      <UsersContainer>
        <p>online({numOnlineUsers})</p>
        <ul>
          {onlineUsernames.map((u) => (
            <li>{u}</li>
          ))}
        </ul>
      </UsersContainer>
      <ChattingContainer>
        <MsgContainer>
          {msgs.map((msg) => (
            <p>{msg.text}</p>
          ))}
        </MsgContainer>
        <TextingContainer>
          <ChatInput
            onChange={(event) => setNewMsg(event.target.value)}
            placeholder="enter your text here"
          />
          <ChatBtn type="submit" onClick={sendMsg}>
            Send
          </ChatBtn>
        </TextingContainer>
      </ChattingContainer>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const UsersContainer = styled.div`
  height: 100vh;
  width: 20vw;
  border: 2px solid black;
`;

const ChattingContainer = styled.div`
  height: 100vh;
  width: 80vw;
  border: 2px solid black;
`;

const MsgContainer = styled.div`
  height: 90%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 20px;
`;

const TextingContainer = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  overflow: auto;
`;

const ChatInput = styled.input`
  width: 80%;
  height: 100%;
  padding: 20px;
  font-size: large;
`;

const ChatBtn = styled.button`
  width: 20%;
  height: 100%;
  font-size: large;
  cursor: pointer;
`;


export default Home;
