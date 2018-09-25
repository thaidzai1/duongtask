import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';
import MainPage from './Components/MainPage';

class App extends Component {
  componentWillMount(){
  }
  render() {
    return (
      <Provider store={ store }>
        <MainPage></MainPage>
      </Provider>
    );
  }
}

export default App;
