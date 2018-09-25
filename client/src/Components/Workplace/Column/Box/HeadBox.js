import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Form } from 'reactstrap'

import { updateBox } from '../../../../actions/wpActions'
import { getUserCreateBox, deleteBox } from '../../../../actions/wpActions';

class HeadBox extends React.Component{
  // state = {
  //   inputName: ''
  // }

  componentWillMount(){
    this.props.getUserCreateBox(this.props.box.created_by);
    document.addEventListener('mousedown', this.closeEditBoxName);
  }

  closeEditBoxName = event => {
    if(event.target.contains(this.BoxNameRef)){
      this.props.closeEditBox();
    }
  }

  deleteBox = () => {
    this.props.deleteBox(this.props.box._id);
  }

  ChangeBoxName = event => {
    event.preventDefault();
    console.log(this.InputBoxName.value);
    let box = {
      id: this.props.box._id,
      name: this.InputBoxName.value
    }

    this.props.updateBox(box);
  }

  ShowEditBox = () => {
    if(this.props.editInvoke){
      return (
        <Form onSubmit={this.ChangeBoxName} innerRef={node => this.BoxNameRef = node}>
          <Input
            innerRef={node => this.InputBoxName = node}
            placeholder={this.props.box.name}
          ></Input>
        </Form>
      )
    }
    else{
      return (
        <div>
          <h3>{this.props.box.name}</h3><Badge color='success'>New</Badge>
        </div>
      )
    }
  }

  render(){
    return (
      <div className='boxheader'>
        <div className='close' onClick={this.deleteBox}>&times;</div>
        <div
          onClick={this.props.ToggleListItem}
          className='header-name'
          >
          {this.ShowEditBox()}
          <q className='box-creater'>{this.props.created_by.username}</q>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  created_by: state.boxs.created_by
})

export default connect(mapStateToProps, { getUserCreateBox, deleteBox, updateBox })(HeadBox);
