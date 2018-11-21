import React from 'react'
import PropTypes from 'prop-types'

const ChatFriend = (props) => {
  return(
    <div className='chat-face' onClick={() => props.LetChat(props.friend)}>
      <div className='avatar'>
      </div>
      <div className='name'>
        <h5>{props.friend.username}</h5>
      </div>
    </div>
  )
}

export default ChatFriend;
