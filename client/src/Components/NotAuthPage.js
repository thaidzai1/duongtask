import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LoginForm from './Auth/Login/LoginForm';
import SignUp from './Auth/Signup/SignUp';
import Test from './Test';

const NotAuthPage = (props) => {
  console.log(props);
  return (
    <div>
      <Route path='/' exact component={LoginForm}></Route>
      <Route path='/signup' exact component={SignUp}></Route>

    </div>
  )
}

export default NotAuthPage;
