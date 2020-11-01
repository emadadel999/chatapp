import {
  RECIEVE_AUTH,
  REQUEST_AUTH,
  FETCH_AUTH_FAILED,
} from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  isFetching: false,
  serverError: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...state,
        isFetching: true,
      };
    case RECIEVE_AUTH:
      return {
        isLoggedIn: action.payload.isAuth,
        isFetching: false,
        serverError: ''
      };
    case FETCH_AUTH_FAILED:
      return {
        isLoggedIn: false,
        isFetching: false,
        serverError: action.payload
      };
    default:
      return { ...state };
  }
};

export default authReducer;
