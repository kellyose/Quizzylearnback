class QuizController {
  constructor() {
    // Sample quizzes
    this.quizzes = [
      {
        id: '1',
        title: 'JavaScript Fundamentals',
        category: 'Programming',
        difficulty: 'Beginner',
        duration: 10,
        question_count: 5,
        xp_reward: 100,
        description: 'Test your JavaScript basics knowledge',
        questions: [
          {
            id: '1',
            question: 'Which keyword is used to declare a variable in JavaScript?',
            options: ['var', 'let', 'const', 'All of the above'],
            correctAnswer: 3,
            explanation: 'All three (var, let, and const) are used to declare variables in JavaScript.'
          },
          {
            id: '2',
            question: 'What does NaN stand for?',
            options: ['Not a Number', 'Not a Null', 'New a Number', 'None of the above'],
            correctAnswer: 0,
            explanation: 'NaN stands for "Not a Number".'
          }
        ]
      },
      {
        id: '2',
        title: 'Web Development Basics',
        category: 'Web',
        difficulty: 'Beginner',
        duration: 15,
        question_count: 8,
        xp_reward: 150,
        description: 'Basic web development concepts',
        questions: [
          {
            id: '1',
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Hyper Transfer Markup Language',
              'Home Tool Markup Language'
            ],
            correctAnswer: 0,
            explanation: 'HTML stands for Hyper Text Markup Language.'
          }
        ]
      }
    ];
  }

  // Get all quizzes (without answers)
  async getQuizzes(req, res) {
    try {
      const safeQuizzes = this.quizzes.map(quiz => ({
        ...quiz,
        questions: quiz.questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options
        }))
      }));

      res.json({
        success: true,
        quizzes: safeQuizzes,
        count: safeQuizzes.length
      });

    } catch (error) {
      console.error('Get quizzes error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get quizzes'
      });
    }
  }

  // Get quiz by ID (with answers for checking)
  async getQuiz(req, res) {
    try {
      const { id } = req.params;
      const quiz = this.quizzes.find(q => q.id === id);

      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz not found'
        });
      }

      res.json({
        success: true,
        quiz
      });

    } catch (error) {
      console.error('Get quiz error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get quiz'
      });
    }
  }

  // Submit quiz answers
  async submitQuiz(req, res) {
    try {
      const { id } = req.params;
      const { answers, timeTaken } = req.body;
      
      const quiz = this.quizzes.find(q => q.id === id);
      
      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz not found'
        });
      }

      // Calculate score
      let correctAnswers = 0;
      const results = quiz.questions.map((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;
        if (isCorrect) correctAnswers++;
        
        return {
          questionId: question.id,
          question: question.question,
          selectedAnswer: answers[index],
          correctAnswer: question.correctAnswer,
          isCorrect,
          explanation: question.explanation
        };
      });

      const score = Math.round((correctAnswers / quiz.questions.length) * 100);
      const xpEarned = Math.round(quiz.xp_reward * (score / 100));

      res.json({
        success: true,
        score,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        xpEarned,
        timeTaken,
        results
      });

    } catch (error) {
      console.error('Submit quiz error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit quiz'
      });
    }
  }
}

module.exports = new QuizController();