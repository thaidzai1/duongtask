import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUserFriendList} from '../../../actions/messageActions'
import ChatFriend from './ChatFriend'

class ChatList extends React.Component {

  componentWillMount(){
    const localAuth = JSON.parse(localStorage.getItem('auth-user'));
    if(localAuth){
      this.props.getUserFriendList(localAuth.userId).then(data => {
        this.props.autoJoinFirstRoom();
      })
    }
  }
  
  render(){
    return (
      <div className='chat-list'>
        {
          this.props.friend_list.list.map(friend => {
            return (
              <ChatFriend
                friend={friend} key={friend.friend_id} id={friend.friend_id}
                LetChat={(friend) => this.props.StartChating(friend)}
              ></ChatFriend>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  friend_list: state.communicate
})

export default connect(mapStateToProps, { getUserFriendList })(ChatList);
