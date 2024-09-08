import React, { useContext, useEffect, useRef } from "react";

import { MyRoomContext } from "../../shared/reducers/MyRoomContext";

interface ChatRoomProps {
  onSendMsgClicked: (msgText: string, roomId?: string) => void
  onClose: (currentRoomId?: string) => void
}

const ChatRoom = ({ onSendMsgClicked, onClose }: ChatRoomProps) => {
  const chatInput = useRef<HTMLInputElement>(null);
  const chatRoomContainer = useRef<HTMLDivElement>(null);
  const room = useContext(MyRoomContext);
  useEffect(() => {
    chatRoomContainer.current?.scrollTo({
      left: 0,
      top: chatRoomContainer.current.scrollHeight,
      behavior: 'smooth'
    });
    if (chatRoomContainer && chatRoomContainer.current) {
    }
  })


  return (
    <>
      { room ? (
        <div className="chat-room__container" >
          <div className="chat-room__heading">
            <h1 className="chat-room__name">{ room.roomName }</h1>
            <button className="chat-room__close-btn" onClick={() => onClose(room.id)}>X</button>
          </div>
          <div className="msgs__container" ref={chatRoomContainer}>
            {room && room.messages ? (
              room.messages.map((msg, i) => (
                <p key={i}>
                  <b>{msg.senderName}</b>: {msg.content}
                </p>
              ))
            ) : (
              <p>no previous msgs found</p>
            )}
          </div>
          <div className="texting__container">
            <input className="chat__input" ref={chatInput} placeholder="enter your text here" />
            <button
              className="chat__btn"
              type="submit"
              onClick={() => {
                if (chatInput?.current?.value) {
                  onSendMsgClicked(chatInput.current.value, room.id);
                  chatInput.current.value = "";
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatRoom;
