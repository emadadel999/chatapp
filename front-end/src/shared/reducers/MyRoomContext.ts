import { createContext, useReducer } from 'react';
import { Message, Room } from '../../types/types';

export const initialMyRoom : Room = {
    id: '',
    roomName: 'default',
    roomType: '',
    userIDs: [],

} 

export const MyRoomContext = createContext<Room | undefined>(undefined);
export const MyRoomDispatchContext = createContext<React.Dispatch<RoomAction> | undefined>(undefined);

interface RoomAction {
    type: string;
    messages?: Message[];
    msgPayload?: { msg: Message, roomId: string };
    room?: Room
  }
export function myRoomReducer(myRoom: Room | undefined, action: RoomAction) {
    switch (action.type) {
        case 'setRoom': {
            console.log("setRoom called", action.room);
            return action.room
        }
        case 'addMsg': {
            if (myRoom?.messages && action.msgPayload?.msg) {
                console.log('reducer adding new msg', action.msgPayload);
                console.log('to current msgs', myRoom.messages);

                return {
                    ...myRoom,
                    messages: [
                        ...myRoom.messages,
                        action.msgPayload.msg
                    ]
                };
            } else if (action.msgPayload?.msg) {
                console.log('reducer adding first room msg', action.msgPayload);

                return {
                    ...myRoom,
                    messages: [
                        action.msgPayload.msg
                    ]
                } as Room; 
            } else return myRoom;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
