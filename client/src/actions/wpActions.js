import axios from 'axios';

import {
  GET_BOXS, CREATE_BOX, DELETE_BOX, GET_BOX_ITEMS, UPDATE_BOX,
  CHECK_TOKEN, GET_USER_VIA_ID } from './type';

export const setHeader = () => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth){
    axios.defaults.headers.common['Authorization']= 'Bearer ' + localAuth.token;
  }
}

export const getUserBoxs = user_id => dispatch => {
  setHeader();
  axios.get('/api/workplace/boxs/'+ user_id)
    .then(res => {
      return dispatch({
        type: GET_BOXS,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: err.response.data.authen
      })
    })
}

export const getUserCreateBox = id => dispatch => {
  setHeader();
  axios.get('/api/user/'+id)
    .then(res => {
      return dispatch({
        type: GET_USER_VIA_ID,
        payload: res.data.user
      })
    })
}

export const createBox = box => dispatch => {
  setHeader();
  axios.post('/api/workplace/box', box)
    .then(res => {
      return dispatch({
        type: CREATE_BOX,
        payload: res.data.box
      })
    })
    .catch(err => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: err.response.data.authen
      })
    })
}

export const deleteBox = box_id => dispatch => {
  setHeader();
  axios.delete('/api/workplace/box/'+ box_id)
    .then(res => {
      return dispatch({
        type: DELETE_BOX,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: err.response.data.authen
      })
    })
}

export const updateBox = box => dispatch => {
  setHeader();
  axios.put('/api/workplace/box/'+ box.id, box)
    .then(res => {
      console.log(res.data);
      return dispatch({
        type: UPDATE_BOX,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: err.response.data.authen
      })
    })
}
