const express = require('express');
const router = express.Router();
const { create, getAllById } = require('../controllers/purchases.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Create
router.post('/', isAuth, create);

// Get by Id U
router.get('/', isAuth, getAllById);

module.exports = router;