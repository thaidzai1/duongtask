import { SOCKET_CONNECTION, JOIN_ALL_ROOM, JOIN_A_ROOM } from '../actions/type'

const initialState = {
  socket: null,
  room: {},
  rooms: []
}

export default function(state = initialState, action){
  switch(action.type){
    case SOCKET_CONNECTION:
      return{
        ...state,
        socket: action.payload
      }
    case JOIN_ALL_ROOM:
      return{
        ...state,
        rooms: [...action.payload.rooms]
      }
    case JOIN_A_ROOM:
      return{
        ...state,
        room: action.payload
      }
    default:
      return state;
  }
}
