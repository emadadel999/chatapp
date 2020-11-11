import { GET_NEW_MESSAGE, USER_OFFLINE, USER_ONLINE } from "../actions/actionTypes";

const initialState = {
  newMsg: null,
  user: null,
  updatedNumOfUsers: 0
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
        user: action.payload.userId,
        updatedNumOfUsers: action.payload.numOfOnlineUsers
      };
    case USER_OFFLINE:
      return {
        ...state,
        user: action.payload.userId,
        updatedNumOfUsers: action.payload.numOfOnlineUsers
      };
    default:
      return { ...state };
  }
};

export default wsReducer;
