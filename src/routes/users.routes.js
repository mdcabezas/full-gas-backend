const express = require('express');
const router = express.Router();
const { signUp, notRoute, signIn, getMe } = require('../controllers/users.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Signup
router.post('/signup', queryReport, signUp);

// Signin
router.post('/signin', queryReport, signIn);

// Get user authenticate

//Se saca el :id ya que si queremos saber los datos del 
//usuario logueado no tenemos de donde sacar su id desde el front
//por eso solo se deja como /me y se saca toda la información para realizar la busqueda desde el isAuth.
router.get('/usuarios/me', queryReport, isAuth, getMe);

// Not route
//router.get('*', queryReport, notRoute);

module.exports = router;