import axios from 'axios';

import { GET_USER_FRIENDS_LIST, GET_ROOM_ID, GET_ROOM_MESSAGES, SEND_MESSAGES,
SOCKET_NEW_MESSAGE
} from './type';

export const setHeader = () => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.defaults.headers.common['Authorization']= 'Bearer ' + localAuth.token;
  }
}

export const getUserFriendList = user_id => dispatch => {
  setHeader();
  return new Promise((resolve, reject) => {
    axios.get('/api/friend/list/'+ user_id)
    .then(res => {
       dispatch({
          type: GET_USER_FRIENDS_LIST,
          payload: res.data
        });
        resolve(res.data);
    })
  })
}

export const get_room_id = () => dispatch => {
  setHeader();
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.get('/api/friend/allrooms/'+ localAuth.userId)
      .then(res => {
        return dispatch({
          type: GET_ROOM_ID,
          payload: res.data
        })
      })
  }
}

export const getRoomMessages = room_id => dispatch => {
  setHeader();
  axios.get('/api/communicate/messages/'+ room_id)
    .then(res => {
      return dispatch({
        type: GET_ROOM_MESSAGES,
        payload: res.data.chat
      })
    })
}

export const sendMessages = (room_id, chat) => dispatch => {
  setHeader();
  axios.put('/api/communicate/messages/'+ room_id, chat)
    .then(res => {
      return dispatch({
        type: SEND_MESSAGES,
        payload: res.data.chat
      })
    })
}

export const socketNewMessage = data => dispatch => {
  console.log(data);
  return dispatch({
    type: SOCKET_NEW_MESSAGE,
    payload: data
  })
}
