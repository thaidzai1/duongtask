import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkSession } from '../actions/authAction';
import AuthPage from './AuthPage';
import NotAuthPage from './NotAuthPage';
import AppNavBar from './NavBar/AppNavBar';

class MainPage extends React.Component {

  componentWillMount(){
    if(localStorage.getItem('auth-user')){
      this.props.checkSession();
    }
  }

  Authentication = () => {
    const LocalAuth = JSON.parse(localStorage.getItem('auth-user'));
    if(LocalAuth === null){
      return <NotAuthPage></NotAuthPage>
    }
    return (
      <div className='surface'>
        <AppNavBar user={LocalAuth}></AppNavBar>
        <AuthPage></AuthPage>
      </div>
    )
  }

  render () {
    return(
      <BrowserRouter>
        {this.Authentication()}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { checkSession })(MainPage);
