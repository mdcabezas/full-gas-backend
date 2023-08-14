const express = require('express');
const router = express.Router();
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');
const { getAll, getById } = require('../controllers/products.controller');

// Get by All
router.get('/', queryReport, getAll);

// Get by Id
router.get('/:id', queryReport, getById);

module.exports = router;