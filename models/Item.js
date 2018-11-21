const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  parent: {
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
  deadline: {
    type: Date,
    default: null
  }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
