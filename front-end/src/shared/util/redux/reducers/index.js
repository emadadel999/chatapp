import { combineReducers } from "redux";

import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userReducer,
  // wsReducer,
});

export default rootReducer;
