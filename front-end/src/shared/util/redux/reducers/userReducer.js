import {RECIEVE_USER_DATA,} from "../actions/actionTypes";
  
  const initialState = {
    currentUser: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECIEVE_USER_DATA:
        return {
          currentUser: action.payload,
        };
      default:
        return { ...state };
    }
  };
  
  export default userReducer;
  