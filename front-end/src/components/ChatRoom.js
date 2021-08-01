import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { newServerMessage } from "../shared/util/redux/actions/actions";

const ChatRoom = ({ currentUser, roomId }) => {
  const { newMsg } = useSelector((state) => state.wsReducer);
  const [msgs, setMsgs] = useState([]);
  const chatInput = useRef();
  const dispatch = useDispatch();

  // send new message to the server
  const sendMsg = (myMsgText) => {
    const myMsg = {
      text: myMsgText,
      senderName: currentUser.username,
      senderId: currentUser._id,
      recieverId: "",
      sentDate: Date.now(),
      deliveredDate: "",
      readDate: "",
    }
    setMsgs([...msgs, myMsg]);
    dispatch(newServerMessage(myMsg, roomId));
  };


  useEffect(() => {
    if (newMsg) {
      setMsgs((prevMsgs) => [...prevMsgs, newMsg]);
    }
  }, [newMsg])


  
  return (
    <ChattingContainer>
      <MsgContainer>
        {msgs ? (
          msgs.map((msg) => (
            <p key={uuid()}>
              <b>{msg.senderName}</b>: {msg.text}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </MsgContainer>
      <TextingContainer>
        <ChatInput
          ref={chatInput}
          placeholder="enter your text here"
        />
        <ChatBtn
          type="submit"
          onClick={() => {
            sendMsg(chatInput.current.value);
            chatInput.current.value = "";
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
