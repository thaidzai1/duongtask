import axios from 'axios'

import { GET_BOX_ITEMS, UPDATE_ITEM, DELETE_ITEM, CREATE_ITEM } from '../type'

const setHeader = () => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localAuth.token;
  }
}

export const getBoxItems = box_id => dispatch => {
  setHeader();
  axios.get('/api/workplace/items/'+ box_id)
    .then(res => {
      return dispatch({
        type: GET_BOX_ITEMS,
        payload: res.data
      })
    })
}

export const createItem = item => dispatch => {
  setHeader();
  axios.post('/api/workplace/item', item)
    .then(res => {
      console.log(res.data);
      return dispatch({
        type: CREATE_ITEM,
        payload: res.data
      })
    })
}

export const updateItem = (item_id, item) => dispatch => {
  setHeader();
  axios.put('/api/workplace/item/'+ item_id, item)
    .then(res => {
      return dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      })
    })
}

export const deleteItem = item_id => dispatch => {
  setHeader();
  axios.delete('/api/workplace/item/'+ item_id)
    .then(res => {
      return dispatch({
        type: DELETE_ITEM,
        payload: res.data
      })
    })
}
