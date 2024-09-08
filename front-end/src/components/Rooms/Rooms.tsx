import { Room, User } from "../../types/types";
import { List, ListElement, Loading, RoomsContainer } from "./Rooms-styles";

interface RoomsProps {
  rooms?: Room[],
  currentUser: User,
  onRoomClicked: (currentRoom: Room) => void
}

const Rooms = ({ rooms, onRoomClicked }: RoomsProps) => {
  return (
    <RoomsContainer>
      {rooms ? (
        <List>
          {rooms.map((room) => {
            return (
              <ListElement key={room.id} onClick={() => onRoomClicked(room)}>
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
