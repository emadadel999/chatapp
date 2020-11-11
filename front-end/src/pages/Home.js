import React, { useEffect } from "react";

import styled from "styled-components";
import Users from "../components/Users";
import ChatRoom from "../components/ChatRoom";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect } from "../shared/util/redux/actions/actions";
import { BACKEND_SERVER } from "../shared/globals";

const Home = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect(BACKEND_SERVER));
  }, [dispatch]);

  return (
    <Container>
      <Users currentUser={currentUser} />
      <ChatRoom currentUser={currentUser} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Home;
