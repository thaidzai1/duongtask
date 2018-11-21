import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';
import { connect } from 'react-redux'

import { createItem } from '../../../../actions/workplace/itemActions'

class AddItemForm extends React.Component {

  componentDidMount(){
    document.addEventListener('mousedown', this.handleClickOutsideForm);
  }

  handleClickOutsideForm = event =>{
    if(event.target.contains(this.FormRef)){
      this.props.closeFormAddItem();
    }
  }

  createNewItem = event => {
    event.preventDefault();
    console.log(this.nameBoxInput.value);
    let item = {
      name: this.nameBoxInput.value,
      created_by: JSON.parse(localStorage.getItem('auth-user')).userId,
      parent: this.props.boxId
    }
    console.log(item);
    this.props.createItem(item);
    this.nameBoxInput.value = '';
  }

  render() {
    return(
      <Form className='form-item' innerRef={node => this.FormRef = node} onSubmit={this.createNewItem}>
        <FormGroup>
          <Input
            innerRef={node => this.nameBoxInput = node}
            type='text' name='boxname' placeholder='Type New Box Name'
          ></Input>
        </FormGroup>
        <Button outline color='success'>Create Box</Button>
        <Button
          outline color='danger'
          onClick={this.props.closeFormAddItem}
        >&times;</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { createItem })(AddItemForm);
