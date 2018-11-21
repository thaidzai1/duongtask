const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('../server').bcrypt;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  tel: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.validatePass = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;
