import React from 'react'
import PropTypes from 'prop-types'

class ChatHeader extends React.Component {
  render () {
    return(
      <div className='chat-header'>
        <h4>{this.props.isChating.username}</h4>
      </div>
    )
  }
}

export default ChatHeader;
