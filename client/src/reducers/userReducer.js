import { LOG_IN, LOG_OUT, LOG_IN_ERROR, SIGN_UP, SIGN_UP_ERROR, CHECK_TOKEN } from '../actions/type';

const initialState = {
  user: {},
  error: null,
  authen: null
}

export default function(state = initialState, action){
  switch(action.type){
    case LOG_IN:
      localStorage.setItem('auth-user', JSON.stringify(action.payload));
      return {
        ...state,
        authen: true,
        user: action.payload
      }
    case LOG_IN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SIGN_UP:
      return {
        ...state,
        error: action.payload.message
      }
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case LOG_OUT:
      return{
        ...state,
        authen: action.payload
      }
    case CHECK_TOKEN:
      if(action.payload === false){
        localStorage.removeItem('auth-user');
      }
      return {
        ...state,
        authen: action.payload
      }
    default:
      return state;
  }
}
