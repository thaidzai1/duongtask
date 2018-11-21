import React from 'react'
import PropTypes from 'prop-types'

class MyChat extends React.Component {
  render () {
    return(
      <div className='mychat'>
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default MyChat;
