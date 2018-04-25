const mongoose = require('mongoose');

let answerSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  answer: String,
  vote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},{
  timestamps: true
})

let answer = mongoose.model('answer', answerSchema)

module.exports = answer;
