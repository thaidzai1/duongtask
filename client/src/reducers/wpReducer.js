import { GET_BOXS, CREATE_BOX, DELETE_BOX, GET_USER_VIA_ID, UPDATE_BOX } from '../actions/type';

const initialState = {
  boxs: [],
  created_by: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_BOXS:
      return{
        ...state,
        boxs: action.payload
      }
    case GET_USER_VIA_ID:
      return {
        ...state,
        created_by: action.payload
      }
    case CREATE_BOX:
      return {
        ...state,
        boxs: [...state.boxs, action.payload]
      }
    case DELETE_BOX:
      return {
        ...state,
        boxs: state.boxs.filter(box => box._id !== action.payload.box._id)
      }
    case UPDATE_BOX:
      let boxs = state.boxs;
      for(let box of boxs){
        if(box._id === action.payload._id){
          box = action.payload.name;
        }
      }
      return {
        ...state,
        boxs: [...boxs]
      }
    default:
      return state;
  }
}
