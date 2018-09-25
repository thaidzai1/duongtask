import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux'

import { updateItem } from '../../../../../actions/workplace/itemActions'
import ModalWarning from './ModalWarning'

class ItemDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toggleModal: false
    }
  }

  changeDateFormat = date => {
    let newDate = new Date(date);
    var newFormat = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
    return newFormat;
  }

  handleOnItemChange = event => {
    this.setState({
      form: {
        [event.target.name]: event.target.value
      }
    })
  }

  handleUpdateItem = event => {
    event.preventDefault();
    let item = {
      name: this.InputName.value,
      description: this.InputDescription.value,
      deadline: Date(this.InputDeadline.value),
      parent: this.props.item.parent
    }

    this.props.updateItem(this.props.item._id, item);
    this.props.closeModal();
  }

  openWaringDelete = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    })
  }

  render () {
    console.log(this.props);
    return (
      <div>
        <Form onSubmit={this.handleUpdateItem}>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Item's name</InputGroupText>
              </InputGroupAddon>
              <Input
                type='text' name='name' placeholder="Type work's name"
                defaultValue={this.props.item.name}
                innerRef={node => this.InputName = node}
                onChange={this.handleOnItemChange}
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Item's description</InputGroupText>
              </InputGroupAddon>
              <Input
                type='text' name='description' placeholder="Type work's description"
                defaultValue={this.props.item.description}
                innerRef={node => this.InputDescription = node}
                onChange={this.handleOnItemChange}
              ></Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Item's deadline</InputGroupText>
              </InputGroupAddon>
              <Input
                type='date' name='deadline' placeholder="Type work's deadline"
                defaultValue={this.changeDateFormat(this.props.item.deadline)}
                innerRef={node => this.InputDeadline = node}
                onChange={this.handleOnItemChange}
              ></Input>
            </InputGroup>
          </FormGroup>
          <Button
            outline color="primary"
            block
          >Update</Button>
          <Button
            outline color="danger" block
            onClick={this.openWaringDelete}
          >Delete</Button>
        </Form>
        <ModalWarning
          item={this.props.item}
          toggleModal={this.state.toggleModal}
          handleToggleModal={this.openWaringDelete}
          closeDetailModal={this.props.closeModal}
        ></ModalWarning>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items
})

export default connect(mapStateToProps, { updateItem })(ItemDetails);
