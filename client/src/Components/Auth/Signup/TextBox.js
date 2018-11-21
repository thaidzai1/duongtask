import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';

class TextBox extends React.Component {
  componentDidMount(){
    console.log('did');
  }

  validateLogin = () => {
    let invalid = {message: '', status: null};
    const errors = this.props.auth.error;
    console.log(errors);
    if(errors !== null && errors !== false){
      invalid = {message: '', status: null};
      errors.map(err => {
        if(this.props.name === err.param){
          invalid = {message: err.msg, status: true}
        }
      })
    }
    return invalid;
  }

  render () {
    const invalid = this.validateLogin();
    return (
      <FormGroup>
        <Label>{this.props.label}</Label>
        <Input
          valid={invalid.status !== null ? true : false}
          invalid={invalid.status !== null ? invalid.status : false}
          type={this.props.type} name={this.props.name} placeholder={this.props.placeholder}
          onChange={this.props.handleOnChange}
        ></Input>
      <FormFeedback invalid="true" tooltip>{invalid.message}</FormFeedback>
    </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TextBox);
