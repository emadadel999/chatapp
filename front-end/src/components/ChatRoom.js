import React, { useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';


const ChatRoom = ({ msgs, sendMsg, currentUser }) => {
  const [newMsg, setNewMsg] = useState(null);
  const chatInput = useRef();

  return (
    <ChattingContainer>
      <MsgContainer>
        {msgs.map((msg) => (
          <p key={uuid()}>{msg.senderName}: {msg.text}</p>
        ))}
      </MsgContainer>
      <TextingContainer>
        <ChatInput
          onChange={(event) =>
            setNewMsg({
              text: event.target.value,
              senderName: currentUser.username,
              senderId: currentUser._id,
              recieverId: "",
              sentDate: Date.now(),
              deliveredDate: "",
              readDate: "",
            })
          }
          ref={chatInput}
          placeholder="enter your text here"
        />
        <ChatBtn
          type="submit"
          onClick={() => {
            chatInput.current.value = "";
            sendMsg(newMsg);
          }}
        >
          Send
        </ChatBtn>
      </TextingContainer>
    </ChattingContainer>
  );
};

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

export default ChatRoom;
