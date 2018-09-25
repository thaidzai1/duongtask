import React from 'react';
import { Form, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';

import { login } from '../../../actions/authAction';
import TextBox from './TextBox';

class LoginForm extends React.Component {

  state = {
    inputName: '',
    textboxs: [
      {label: 'Email', type: 'email', name: 'email', placeholder: 'Input Your Email', rel:'email', valid: ''},
      {label: 'Password', type: 'password', name: 'password', placeholder: 'Keep your password safe', rel:'password', valid: ''}
    ]
  }

  getTextBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  LogMeIn = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user);
  }

  responseGoogle = response => {
    console.log(response);
  }

  render () {
    return (
      <div className="login-form">
        <Col sm='12' md={{size:8, offset: 2}} className='login-card'>
          <Form onSubmit={this.LogMeIn}>
            {
              this.state.textboxs.map(txtbox => {
                return (
                    <TextBox
                      key={txtbox.name}
                      label={txtbox.label}
                      type={txtbox.type} name={txtbox.name} placeholder={txtbox.placeholder}
                      handleOnChange={this.getTextBoxChange}
                    ></TextBox>
                  )
                })
            }
            <Button
              outline color="primary"
              block
            >Let me start</Button>
          </Form>
          <p>Not have account yet?<Link to='/signup'> Sign up</Link></p>
          <p>You are lazyy ?????<a href='/api/oauth/google'> Just go with Google</a></p>
          <GoogleLogin
            clientId="802007353549-v3ul9p7n8rqbvqtchglvmng2jfuoo725.apps.googleusercontent.com"
            buttonText="Google Let's go"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(LoginForm);
