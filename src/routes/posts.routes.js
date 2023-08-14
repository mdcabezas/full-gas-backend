const express = require('express');
const router = express.Router();
const { create, getAll, getById, updateById, deleteById, getByIdUser } = require('../controllers/posts.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const { queryReport } = require('../middlewares/log.middleware');

// Create
router.post('/', queryReport, isAuth, create);

// Get by All
router.get('/', queryReport, getAll);

// Get by Id
router.get('/:id', queryReport, getById);

// Update
router.put('/:id', queryReport, isAuth, updateById);

// Delete
router.delete('/:id', queryReport, deleteById);

// Get by Id USer
router.get('/user/:id', queryReport, getByIdUser);

module.exports = router;