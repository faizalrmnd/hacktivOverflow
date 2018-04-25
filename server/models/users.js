const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: String,
  password: String
},{
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user;
