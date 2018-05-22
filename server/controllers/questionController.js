const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const question = require('../models/questions');

module.exports = {
  getQuestion: function (req, res) {
    question.find({})
            .populate('user')
            .populate({
              path: 'answer',
              // Get friends of friends - populate the 'friends' array for every friend
              populate: { path: 'user' }
            })
            .then(questions => {
              res.status(200).json({
                data: questions
              })
            })
  },
  postQuestion: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      let newQuestion = new question({
        user: decoded.id,
        title: req.body.title,
        question: req.body.question
      })

      newQuestion.save((err, result) => {
        if(err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: 'successfully added a new question !',
            data: result
          })
        }
      })
    })
  },
  updateQuestion: function (req, res) {
    question.findByIdAndUpdate({ _id: req.body.id }, {
      title: req.body.title,
      question: req.body.question
    })
    .then(update => {
      res.status(200).json({
        message: `berhasil mengubah data`,
        data: update
      })
    })
  },
  removeQuestion: function (req, res) {
    question.findByIdAndRemove({ _id: req.body.id })
    .then(update => {
      res.status(200).json({
        message: `berhasil menghapus data`,
        data: update
      })
    })
  },

  vote: function (req, res) {
    let token = req.headers.token;

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      question.findById({ _id: req.body.id })
      .then(result => {
        if(!result.voter.includes(decoded.id)) {
          if (req.body.command ==='plus') {
            question.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              question.findByIdAndUpdate({ _id: req.body.id }, {
                $push: { upvote: mongoose.Types.ObjectId(decoded.id) }
              })
              .then(upvoted => {
                res.status(200).json({
                  message: `berhasil menambah vote`,
                  data: upvoted
                })
              })
            })
          } else if (req.body.command === 'minus') {
            question.findByIdAndUpdate({ _id: req.body.id }, {
              $push: { voter: mongoose.Types.ObjectId(decoded.id) }
            })
            .then(addVoter => {
              question.findByIdAndUpdate({ _id: req.body.id }, {
                $push: { downvote: mongoose.Types.ObjectId(decoded.id) }
              })
              .then(upvoted => {
                res.status(200).json({
                  message: `berhasil mengurangi vote`,
                  data: upvoted
                })
              })
            })
          }
        } else {
          res.status(500).json({
            message: 'sudah pernah vote'
          })
        }
      })
    })
  }
}