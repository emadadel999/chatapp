import React, { useRef } from "react";
import {
  ChatBtn,
  ChatInput,
  ChattingContainer,
  MsgContainer,
  TextingContainer,
} from "./ChatRoom-styles";

import { v4 as uuid } from "uuid";

const ChatRoom = ({ room, onSendMsgClicked }) => {
  const chatInput = useRef();
  let msgs = null;
  if (room.messages && room.messages.length > 0) {
    msgs = room.messages;
  }

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
          <p>no previous msgs found</p>
        )}
      </MsgContainer>
      <TextingContainer>
        <ChatInput ref={chatInput} placeholder="enter your text here" />
        <ChatBtn
          type="submit"
          onClick={() => {
            onSendMsgClicked(chatInput.current.value);
            chatInput.current.value = "";
          }}
        >
          Send
        </ChatBtn>
      </TextingContainer>
    </ChattingContainer>
  );
};

export default ChatRoom;
