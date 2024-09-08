import axios from "axios";
import { BACKEND_SERVER } from "../globals";
import { Message, Room } from "../../types/types";


export function getOrCreateRoom(room: Room) {
  return axios.post(`${BACKEND_SERVER}/api/rooms`, room);
};

export function roomsGetAll(currUserId: string, setRooms: React.Dispatch<React.SetStateAction<Room[] | undefined>>) {
  console.log(currUserId);

  return axios.get(`${BACKEND_SERVER}/api/rooms/${currUserId}`)
    .then(function (res) {
      setRooms(res.data);
    })
    .catch(function (err) {
      const error = err.response ? err.response.data.message : err.message;
      console.error(error);
    });
};

export function addMsgToRoom(msg: Message, roomId: string) {
  console.log("msg to server", { msg, roomId });
  return axios.post(`${BACKEND_SERVER}/api/rooms/${roomId}/newmsg`, { msg })
    .then((success) => {
      console.log("success adding msg to room", success);
    })
    .catch((err) => console.log(err));
};
