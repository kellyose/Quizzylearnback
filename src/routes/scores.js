const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// @route   GET /api/scores/user/:userId
// @desc    Get scores for a user
// @access  Public
router.get('/user/:userId', scoreController.getUserScores);

// @route   POST /api/scores
// @desc    Save a score
// @access  Private
router.post('/', scoreController.saveScore);

module.exports = router;