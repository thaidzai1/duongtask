import socketIOClient from 'socket.io-client'
import axios from 'axios'

import { SOCKET_CONNECTION, JOIN_ALL_ROOM, JOIN_A_ROOM, LEAVE_A_ROOM } from './type'

const socket = socketIOClient('https://duongtask.herokuapp.com/');

export const socket_connection = () => dispatch => {
  return dispatch({
    type: SOCKET_CONNECTION,
    payload: socket
  })
}

export const join_a_room = friend_id => dispatch => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.get('/api/friend/room/'+ localAuth.userId +'/'+ friend_id)
      .then(res => {
        // for(var room of res.data.rooms){
        //   if(room.user_2 === friend_id || room.user_1 === friend_id){
        //     socket.emit('join a room', room);
        //     break;
        //   }
        // }
        socket.emit('join a room', res.data.room);
        return dispatch({
          type: JOIN_A_ROOM,
          payload: res.data.room
        })
      })
  }
}

export const leave_a_room = room_id => dispatch => {
  socket.emit('leave a room', room_id);
  // return dispatch({
  //   type: LEAVE_A_ROOM
  // })
}

export const join_all_rooms = () => dispatch => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.get('/api/friend/allrooms/'+ localAuth.userId)
      .then(res => {
        socket.emit('join all rooms', res.data.rooms);
        return dispatch({
          type: JOIN_ALL_ROOM,
          payload: res.data
        })
      })
  }
}
