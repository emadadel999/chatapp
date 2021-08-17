import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Menu = styled.div`
  border: 2px solid black;
  width: 20vw;
`;

export const CurrentUserContainer = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 8px;
`;

export const CurrentUser = styled.h1``;

export const SignOutBtn = styled.button`
  background-color: lightgrey;
  cursor: pointer;
`;

export const MenuSwitcher = styled.div`
  height: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Switch = styled.div`
  width: 50%;
  text-align: center;
  background-color: ${(props) => (props.selected ? "lightgrey" : "white")};
  border-style: ${(props) => (props.selected ? "none" : "solid")};
  cursor: pointer;
`;
