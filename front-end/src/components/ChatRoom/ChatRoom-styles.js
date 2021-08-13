import styled from "styled-components";

export const ChattingContainer = styled.div`
  height: 100vh;
  width: 80vw;
  border: 2px solid black;
`;

export const MsgContainer = styled.div`
  height: 90%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 20px;
`;

export const TextingContainer = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  overflow: auto;
`;

export const ChatInput = styled.input`
  width: 80%;
  height: 100%;
  padding: 20px;
  font-size: large;
`;

export const ChatBtn = styled.button`
  width: 20%;
  height: 100%;
  font-size: large;
  cursor: pointer;
`;
