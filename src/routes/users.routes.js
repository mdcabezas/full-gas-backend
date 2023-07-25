const express = require('express');
const router = express.Router();
const { newUser, notRoute, getSignin, getUserAuthenticate } = require('../controllers/users.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Register New User
router.post('/usuarios', queryReport, newUser);

// Authenticate User
router.post('/login', queryReport, getSignin);

// Get user authenticate
router.get('/usuarios', queryReport, isAuth, getUserAuthenticate);

// Not route
router.get('*', queryReport, notRoute);

module.exports = router;