import React from 'react'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'

import { getRoomMessages, socketNewMessage } from '../../../../actions/messageActions'
import { leave_a_room } from '../../../../actions/communicateSocket'
import MyChat from './MyChat'
import FriendChat from './FriendChat'

class MessagePlace extends React.Component {
  constructor(){
    super();
  }

  componentWillMount(){
  }

  componentWillReceiveProps(nextProps){
    //if chating another friend reset the message and leave previos friend room
    if(nextProps.isChating.friend_id !== this.props.isChating.friend_id){
      this.setState({messages: []});
      this.props.leave_a_room(this.props.socket.room._id);
    }

    if(nextProps.roomId !== this.props.roomId){
      this.props.getRoomMessages(nextProps.roomId);
    }
  }

  componentDidMount(){
    //handle event  from server
    this.props.socket.socket.on('send private message', data => {
      var notify_sound = new Audio('./sound/facebook_chat.mp3');
      this.props.socketNewMessage(data);
      notify_sound.play();
    })
  }

  showMessages = () => {
    const {messages} = this.props.communicate;
    if(messages !== undefined){
      return messages.map(message => {
        if(message.user_id !== this.props.isChating.friend_id){
          return (
            <MyChat
              key={message._id}
              message={message.message}
            ></MyChat>
          )
        }
        else{
          return (
            <FriendChat
              key={message._id}
              message={message.message}
            ></FriendChat>
          )
        }
      })
    }
  }

  render () {
    return(
      <div className='message-place' id='message-place'>
        {this.showMessages()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  communicate: state.communicate
})

export default connect(mapStateToProps, { leave_a_room, getRoomMessages, socketNewMessage })(MessagePlace);
