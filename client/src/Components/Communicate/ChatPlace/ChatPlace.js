import React from 'react'
import PropTypes from 'prop-types'

import ChatHeader from './ChatHeader'
import MessagePlace from './MessagePlace/MessagePlace'
import CommunicatePlace from './CommunicatePlace/CommunicatePlace'

class ChatPlace extends React.Component {
  state = {
    mychat: []
  }

  handleMyChatting = newChat => {
    let mychat = [...this.state.mychat];
    mychat.push(newChat);
    this.setState({
      mychat
    })
  }

  render () {
    return(
      <div className='chat-place'>
        <ChatHeader isChating={this.props.isChating}></ChatHeader>
        <MessagePlace
          isChating={this.props.isChating}
          roomId={this.props.roomId}
        ></MessagePlace>
        <CommunicatePlace
          isChating={this.props.isChating}
          MyChatting={mychat => this.handleMyChatting(mychat)}
        ></CommunicatePlace>
      </div>
    )
  }
}

export default ChatPlace;
