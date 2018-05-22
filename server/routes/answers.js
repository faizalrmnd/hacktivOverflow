var express = require('express');
var router = express.Router();
const answerController = require('../controllers/answerController');
const middleware = require('../middleware/auth');

/* GET users listing. */
router.get('/', middleware.isUser, answerController.getAnswer);
router.post('/post', middleware.isUser, answerController.postAnswer);
router.post('/delete', middleware.isUser, answerController.removeAnswer);
router.put('/vote', middleware.isUser, answerController.vote);


module.exports = router;