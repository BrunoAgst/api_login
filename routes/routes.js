const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const auth = require('../middleware/auth');

router.post('/signin', UsersController.signIn);
router.post('/signup', UsersController.signUp);
router.get('/user', auth, UsersController.findUser);

module.exports = router;