const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/userController');

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public (for now)
router.get('/:id', UserController.getUser);

// @route   PUT /api/users/:id/stats
// @desc    Update user stats
// @access  Private
router.put('/:id/stats', UserController.updateStats);

module.exports = router;
