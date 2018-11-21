import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { createBox } from '../../../actions/wpActions';

class FormBox extends React.Component {
  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutsideForm);
  }

  componentWillUnmount(){
    document.addEventListener('mousedown', this.handleClickOutsideForm);
  }

  handleClickOutsideForm = event => {
    console.log(this.FormRef);
    if(event.target.contains(this.FormRef)){
      this.props.CloseNewbox();
    }
  }

  createNewBox = event => {
    event.preventDefault();
    let newBox = {
      name: this.nameBoxInput.value,
      user_id: JSON.parse(localStorage.getItem('auth-user')).userId
    }
    console.log()
    this.props.createBox(newBox);
  }

  render() {
    return (
      <Row className='form-create-box'>
        <Form id='form-box' innerRef={node => this.FormRef = node} onSubmit={this.createNewBox}>
          <FormGroup>
            <Input
              innerRef={node => this.nameBoxInput = node}
              type='text' name='boxname' placeholder='Type New Box Name'
            ></Input>
          </FormGroup>
          <Button outline color='success'>Create Box</Button>
          <Button
            outline color='danger'
            onClick={this.props.CloseNewbox}
          >&times;</Button>
        </Form>
      </Row>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { createBox })(FormBox);
