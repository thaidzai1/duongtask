import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Test from './Test';
import Workplace from './Workplace/Workplace';
import Communicate from './Communicate/Communicate';

const AuthPage = (props) => {
  return (
    <div className='body-container'>
      <Route path='/test' exact component={Test}></Route>
      <Route path='/' exact component={Workplace}></Route>
      <Route path='/communicate' exact component={Communicate}></Route>
    </div>
  )
}

export default AuthPage;
