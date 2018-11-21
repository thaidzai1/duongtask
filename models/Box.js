const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_by: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  community: {
    type: String,
    default: null
  },
  groupId: {
    type: String,
    default: null
  }
});

const Box = mongoose.model('box', boxSchema);

module.exports = Box;
