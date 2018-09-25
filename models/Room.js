const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: String,
  user_id: String
});

const roomSchema = new Schema({
  user_1:{
    type: String,
    required: true
  },
  user_2: {
    type: String,
    required: true
  },
  chat: {
    type: Array(chatSchema)
  }
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
