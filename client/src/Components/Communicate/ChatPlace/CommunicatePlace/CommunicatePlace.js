import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'reactstrap'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'

import { sendMessages } from '../../../../actions/messageActions'

class CommunicatePlace extends React.Component {
  constructor() {
    super();
  }

  SendItToMyFriend = e => {
    e.preventDefault();
    //send message to friend's room
    if(this.refs.ChatTextRef.value.trim() !== '')
    {
      let user_id = JSON.parse(localStorage.getItem('auth-user')).userId;
      let room = this.props.socket.room;
      this.props.socket.socket.emit('send message', {
        room: room._id,
        user_id: user_id,
        message: this.refs.ChatTextRef.value.trim()
      });
      this.props.MyChatting(this.refs.ChatTextRef.value.trim());
      let chat = {
        user_id: user_id,
        message: this.refs.ChatTextRef.value.trim()
      }
      this.props.sendMessages(room._id, chat);
      this.refs.ChatTextRef.value = '';
    }
  }

  handleSubmitWithTextArea = event => {
    if(event.which === 13){
      if(event.shiftKey){
      }
      else{
        event.preventDefault();
        this.SendItToMyFriend(event);
      }
    }
  }

  render () {
    return (
      <div className='communicate-place'>
        <Form onSubmit={this.SendItToMyFriend}>
          <textarea ref='ChatTextRef' rows='3' onKeyPress={this.handleSubmitWithTextArea}></textarea>
          <Button outline color='primary'>Talk Talk</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps, { sendMessages })(CommunicatePlace);
