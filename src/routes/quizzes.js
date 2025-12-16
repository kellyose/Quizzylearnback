const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// @route   GET /api/quizzes
// @desc    Get all quizzes
// @access  Public
router.get('/', quizController.getQuizzes);

// @route   GET /api/quizzes/:id
// @desc    Get quiz by ID
// @access  Public
router.get('/:id', quizController.getQuiz);

// @route   POST /api/quizzes/:id/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:id/submit', quizController.submitQuiz);

module.exports = router;