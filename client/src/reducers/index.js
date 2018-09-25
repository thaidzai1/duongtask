import { combineReducers } from 'redux';
import userReducer from './userReducer';
import wpReducer from './wpReducer';
import itemReducer from './workplace/itemReducer';
import messageReducer from './messageReducer';
import communicateSocket from './communicationSocketReducer'

export default combineReducers({
  auth: userReducer,
  boxs: wpReducer,
  items: itemReducer,
  communicate: messageReducer,
  socket: communicateSocket
});
