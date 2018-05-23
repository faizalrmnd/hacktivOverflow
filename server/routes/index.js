var express = require('express');
var router = express.Router();
const authController = require('../controllers/userController');
const mailController = require('../controllers/mailController');

/* GET home page. */
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/oauth', authController.oAuthLogin);
router.post('/email', mailController.sendNotification);

module.exports = router;
