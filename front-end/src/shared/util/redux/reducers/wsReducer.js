import { GET_NEW_MESSAGE, USER_OFFLINE, USER_ONLINE } from "../actions/actionTypes";

const initialState = {
  newMsg: null,
  numOfOnlineUsers: 0,
  userId: "",
  isOnline: false
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEW_MESSAGE:
      return {
        ...state,
        newMsg: action.payload
      };
    case USER_ONLINE:
      return {
        ...state,
        numOfOnlineUsers: action.payload.numOfOnlineUsers,
        userId: action.payload.userId,
        isOnline: true
      };
    case USER_OFFLINE:
      return {
        ...state,
        numOfOnlineUsers: action.payload.numOfOnlineUsers,
        userId: action.payload.userId,
        isOnline: false
      };
    default:
      return { ...state };
  }
};

export default wsReducer;
