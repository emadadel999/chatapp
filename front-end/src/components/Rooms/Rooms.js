import { List, ListElement, Loading, RoomsContainer } from "./Rooms-styles";

const Rooms = ({ rooms, onRoomClicked }) => {
  return (
    <RoomsContainer>
      {rooms ? (
        <List>
          {rooms.map((room) => {
            return (
              <ListElement key={room._id} onClick={() => onRoomClicked(room)}>
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

export default Rooms;
