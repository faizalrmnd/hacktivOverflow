const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: String,
  question: String,
  answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answer' }],
  voter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvote: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
},{
  timestamps: true
})

let question = mongoose.model('question', questionSchema)

module.exports = question;
