import { combineReducers } from "redux";

import userReducer from "./userReducer";
import wsReducer from "./wsReducer";

const rootReducer = combineReducers({
  userReducer,
  // wsReducer,
});

export default rootReducer;
