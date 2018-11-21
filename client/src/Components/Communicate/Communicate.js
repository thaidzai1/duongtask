import React from 'react'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { socket_connection, join_all_rooms, join_a_room } from '../../actions/communicateSocket'
import { get_room_id } from '../../actions/messageActions'
import { checkSession } from '../../actions/authAction'
import ChatList from './ChatList/ChatList'
import ChatPlace from './ChatPlace/ChatPlace'

class Communicate extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isChatingWith: {
        username: '',
        friend_id: ''
      }
    }
  }

  componentWillMount(){
    //start the socket connection
    if(localStorage.getItem('auth-user')){
      this.props.checkSession();
      this.props.socket_connection();
    }
  }

  //handle chating friend from onClick at chatFace
  handleStartChat = friend => {
    //get info of chating friend
    let isChatingWith = {
      username: friend.username,
      friend_id: friend.friend_id
    }

    //join the room
    this.props.join_a_room(friend.friend_id);

    this.setState({
      isChatingWith
    });
  }

  auto_join_first_room = () => {
    this.setState({
      isChatingWith: {
        username: this.props.communicate.list[0].username,
        friend_id: this.props.communicate.list[0].friend_id
      }
    })

    this.props.join_a_room(this.state.isChatingWith.friend_id);
  }

  render () {
    return (
      <div className='communicate'>
        <ChatList
          StartChating={(friend) => this.handleStartChat(friend)}
          autoJoinFirstRoom = {this.auto_join_first_room}
        ></ChatList>
        <ChatPlace
          isChating={this.state.isChatingWith}
          roomId={this.props.socket.room._id}
        ></ChatPlace>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  communicate: state.communicate
})

export default connect(mapStateToProps, { socket_connection, join_all_rooms, join_a_room, checkSession })(Communicate);
