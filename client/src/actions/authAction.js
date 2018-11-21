import axios from 'axios';
import { LOG_IN, LOG_OUT, LOG_IN_ERROR, SIGN_UP, SIGN_UP_ERROR, CHECK_TOKEN } from './type';

export const setHeader = () => {
  const localAuth = JSON.parse(localStorage.getItem('auth-user'));
  if(localAuth.token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localAuth.token;
  }
}

export const login = user => dispatch => {
  axios.post('/api/login', user).then(res => {
    return dispatch({
      type: LOG_IN,
      payload: res.data
    });
  }).catch(error => {
    return dispatch({
      type: LOG_IN_ERROR,
      payload: error.response.data.message
    });
  });
}

export const signup = user => dispatch => {
  axios.post('/api/signup', user)
    .then(res => {
      return dispatch({
        type: SIGN_UP,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response);
      return dispatch({
        type: SIGN_UP_ERROR,
        payload: err.response.data.message
      })
    })
}

export const logout = () => dispatch => {
  axios.get('/api/logout').then(res => {
    return dispatch({
      type: LOG_OUT,
      payload: res.data
    })
  })
}

export const checkSession = () => dispatch => {
  setHeader();
  axios.get('/api/checkSession')
    .then(res => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: res.data
      })
    })
    .catch((err) => {
      return dispatch({
        type: CHECK_TOKEN,
        payload: err.response.data.authen
      })
    })
}
