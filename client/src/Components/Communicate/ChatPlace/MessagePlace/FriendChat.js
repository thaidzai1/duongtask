import React from 'react'
import PropTypes from 'prop-types'

class FriendChat extends React.Component {
  render () {
    return (
      <div className='friend-chat'>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default FriendChat;
