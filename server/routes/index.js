var express = require('express');
var router = express.Router();
const authController = require('../controllers/userController');

/* GET home page. */
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);

module.exports = router;
