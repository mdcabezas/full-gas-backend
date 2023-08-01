const express = require('express');
const router = express.Router();
const { signUp, notRoute, signIn, getUserAuthenticate } = require('../controllers/users.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Signup
router.post('/signup', queryReport, signUp);

// Signin
router.post('/signin', queryReport, signIn);

// Get user authenticate
router.get('/usuarios/:id', queryReport, isAuth, getUserAuthenticate);

// Not route
//router.get('*', queryReport, notRoute);

module.exports = router;