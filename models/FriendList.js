const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  friend_id: {
    type: String,
    required: true
  },
  added_at: {
    type: Date,
    default: Date.now()
  }
}, {_id: false});

const friendListSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  list: Array(listSchema)
});

const FriendList = mongoose.model('friend_list', friendListSchema);

module.exports = FriendList;
