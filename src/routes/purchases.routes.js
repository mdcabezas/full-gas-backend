const express = require('express');
const router = express.Router();
const { create, getById } = require('../controllers/purchases.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Create
router.post('/', queryReport, isAuth, create);

// Get by Id
router.get('/:id', queryReport, getById);

module.exports = router;