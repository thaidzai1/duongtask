import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import teamworkReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  teamworkReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
