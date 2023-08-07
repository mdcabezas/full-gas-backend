const express = require('express');
const router = express.Router();
const { signUp, signIn, profile} = require('../controllers/users.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Signup
router.post('/signup', queryReport, signUp);

// Signin
router.post('/signin', queryReport, signIn);

// Profile
router.get('/profile', queryReport, isAuth, profile);

module.exports = router;