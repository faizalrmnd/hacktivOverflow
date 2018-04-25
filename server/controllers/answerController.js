const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const answer = require('../models/answers');
const question = require('../models/questions');

module.exports = {
  getAnswer: function(req, res) {
    answer.find({ question: mongoose.Types.ObjectId(req.headers.questionId)})
    .then(questions => {
      res.status(200).json({
        data: questions
      })
    })
  },
  postAnswer: function(req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newAnswer = new answer({
        user: decoded.id,
        answer: req.body.answer
      })

      newAnswer.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          question.findByIdAndUpdate({ _id: req.body.questionId }, {
            $push: { answer: mongoose.Types.ObjectId(result.id) }
          })
          .then(update => {
            res.status(200).json({
              message: `berhasil menambah answer`,
              data: update
            })
          })
          // res.status(201).json({
          //   message: 'successfully added a new answer !',
          //   data: result
          // })
        }
      })
    })
  },
  removeAnswer: function(req, res) {
    answer.findByIdAndRemove({ _id: req.body.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  }
}