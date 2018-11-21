import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Col, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../../../actions/authAction';
import TextBox from './TextBox';

class SignUp extends React.Component {

  state = {
    inputName: '',
    textboxs: [
      {label: 'Email', type: 'email', name: 'email', placeholder: 'Input Your Email'},
      {label: 'Your Name', type: 'text', name: 'username', placeholder: 'Type your name'},
      {label: 'Tel', type: 'text', name: 'tel', placeholder: 'Your telephone number'},
      {label: 'Password', type: 'password', name: 'password', placeholder: 'Type your password'},
      {label: 'Confirm Password', type: 'password', name: 'conf_pass', placeholder: 'Re-type your password'}
    ]
  }

  componentWillMount(){
    console.log(this.props);
  }

  getTextBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  SignMeUp = e => {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      username: this.state.username,
      tel: this.state.tel,
      password: this.state.password,
      conf_pass: this.state.conf_pass
    }
    this.props.signup(newUser);
  }

  announceSuccess = () => {
    const errors = this.props.auth.error;
    if(errors === false && errors !== null){
      return (
        <Alert color='success'>Your account is created successful</Alert>
      )
    }
  }

  render () {
    return (
      <div className='signup-form'>
        <Col sm='12' md={{size:8, offset: 2}} className='login-card'>
          {this.announceSuccess()}
          <Form onSubmit={this.SignMeUp}>
            {
              this.state.textboxs.map(textbox => {
                return(
                  <TextBox
                    key={textbox.name}
                    type={textbox.type}
                    placeholder={textbox.placeholder}
                    label={textbox.label}
                    name={textbox.name}
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
          <p>Have account already? <Link to='/'> Log in</Link></p>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps , { signup })(SignUp);
