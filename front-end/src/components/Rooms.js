import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Axios from "axios";
import { BACKEND_SERVER } from "../shared/globals";

const Rooms = () => {
  const [rooms, setRooms] = useState(null);

  return (
    <RoomsContainer>
      {rooms ? <List></List> : <Loading>Loading...</Loading>}
    </RoomsContainer>
  );
};

const RoomsContainer = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.ul``;

const Loading = styled.div`
  text-align: center;
`;

export default Rooms;
