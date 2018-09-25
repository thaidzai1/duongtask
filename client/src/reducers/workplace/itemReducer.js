import { GET_BOX_ITEMS, UPDATE_ITEM, DELETE_ITEM, CREATE_ITEM } from '../../actions/type'

const initialState = {
  items: []
}

export default function( state = initialState, action){
  switch(action.type){
    case GET_BOX_ITEMS:
      let items = state.items;
      for(let item of action.payload){
        if(items.filter(it => it._id === item._id).length === 0){
          items.push(item);
        }
      }
      return {
        ...state,
        items: items
      }
    case UPDATE_ITEM:
      let updateItem = state.items;
      for(let item of updateItem){
        if(item._id === action.payload._id){
          item.name = action.payload.name,
          item.description = action.payload.description,
          item.parent = action.payload.parent,
          item.deadline = action.payload.deadline
        }
      }
      return {
        ...state,
        items: [...updateItem]
      }
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
      }
    default:
      return state
  }
}
