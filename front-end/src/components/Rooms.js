import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { BACKEND_SERVER } from "../shared/globals";

function _roomsGetAll(currUserId, setRooms) {
  return Axios.get(`${BACKEND_SERVER}/api/rooms/${currUserId}`)
    .then(function (res) {
      setRooms(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    });
}

const Rooms = ({ currentUser, roomChosenHandler }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    if (!rooms) {
      _roomsGetAll(currentUser._id, setRooms);
    }
  }, [currentUser, rooms]);
  return (
    <RoomsContainer>
      {rooms ? (
        <List>
          {rooms.map((room) => {
            return (
              <ListElement
                key={room._id}
                onClick={() => roomChosenHandler(room._id)}
              >
                {room.roomName}
              </ListElement>
            );
          })}
        </List>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </RoomsContainer>
  );
};

const RoomsContainer = styled.div`
  height: 70%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListElement = styled.button`
  cursor: pointer;
  height: 50px;
  font-size: 20px;
`;

const Loading = styled.div`
  text-align: center;
`;

export default Rooms;
