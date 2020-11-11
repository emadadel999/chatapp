import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import wsReducer from './wsReducer';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    wsReducer
});

export default rootReducer;