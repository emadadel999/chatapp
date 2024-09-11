import React, { FormEvent, useContext, useEffect, useRef } from "react";

import { MyRoomContext } from "../../shared/reducers/MyRoomContext";
import { User } from "../../types/types";

interface ChatRoomProps {
  currentUser: User,
  onSendMsgClicked: (msgText: string, roomId?: string) => void
  onClose: (currentRoomId?: string) => void
}

const ChatRoom = ({ currentUser, onSendMsgClicked, onClose }: ChatRoomProps) => {
  const chatInput = useRef<HTMLInputElement>(null);
  const chatRoomContainer = useRef<HTMLDivElement>(null);
  const room = useContext(MyRoomContext);
  useEffect(() => {
    chatRoomContainer.current?.scrollTo({
      left: 0,
      top: chatRoomContainer.current.scrollHeight,
      behavior: 'smooth'
    });
  })

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let textMsg = '';
    if (chatInput.current) {
      textMsg = chatInput?.current?.value;
      chatInput.current.value = "";
      onSendMsgClicked(textMsg, room?.id);
    }
  }
  return (
    <>
      { room ? (
        <div className="chat-room__container" >
          <div className="chat-room__heading">
            <h1 className="chat-room__name">{ room.roomName }</h1>
            <button className="chat-room__close-btn" onClick={() => onClose(room.id)}>
              <img src="/images/close.svg" alt="a close icon"/>
            </button>
          </div>
          <div className="msgs__container" ref={chatRoomContainer}>
            {room && room.messages ? (
              room.messages.map((msg, i) => (
                <p className={`room-msg__container ${currentUser.id === msg.senderId ? '--sender' : ''}`} key={i}>
                  <span className="room-msg__sender">{msg.senderName}</span> 
                  <span className="room-msg__msg">{msg.content}</span>
                </p>
              ))
            ) : (
              <p>no previous msgs found</p>
            )}
          </div>
          <form onSubmit={submitForm} className="texting__container">
            <input 
              className="chat__input" 
              ref={chatInput} 
              placeholder="enter your text here" 
              autoFocus
            />
            <button
              className="chat__btn"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ChatRoom;
