import { GET_USER_FRIENDS_LIST, GET_ROOM_ID, GET_ROOM_MESSAGES, SEND_MESSAGES,
SOCKET_NEW_MESSAGE  
} from '../actions/type'

const initialState = {
  list: [],
  rooms: [],
  messages: []
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_USER_FRIENDS_LIST:
      if(action.payload.success){
        return {
          ...state,
          list: [...action.payload.friendList.list]
        }
      }
      else{
        return state;
      }
    case GET_ROOM_ID:
      if(action.payload.rooms.length > 0){
        return {
          ...state,
          rooms: [...action.payload.rooms]
        }
      }
      else{
        return state;
      }
    case GET_ROOM_MESSAGES:
      return{
        ...state,
        messages: action.payload
      }
    case SEND_MESSAGES:
       return {
         ...state,
         messages: [...state.messages, ...action.payload]
       }
    case SOCKET_NEW_MESSAGE:
    console.log(action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    default:
      return state;
  }
}
