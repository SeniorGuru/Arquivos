import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import userReducer from './user' ;
import reportReducer from './report' ;

export default combineReducers({
    auth : authReducer,
    user : userReducer,
    report : reportReducer
});