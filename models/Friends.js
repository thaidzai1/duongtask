const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  friend_id: {
    type: String,
    required: true
  },
  add_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = friendSchema;
