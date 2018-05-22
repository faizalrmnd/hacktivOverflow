var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController');
const middleware = require('../middleware/auth')

/* GET users listing. */
router.get('/', middleware.isUser, questionController.getQuestion);
router.post('/post', middleware.isUser, questionController.postQuestion);
router.post('/update', middleware.isUser, questionController.updateQuestion);
router.post('/delete', middleware.isUser, questionController.removeQuestion);
router.put('/vote', middleware.isUser, questionController.vote);


module.exports = router;
