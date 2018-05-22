const mongoose = require('mongoose');

let answerSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  answer: String,
  voter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},{
  timestamps: true
})

let answer = mongoose.model('answer', answerSchema)

module.exports = answer;
