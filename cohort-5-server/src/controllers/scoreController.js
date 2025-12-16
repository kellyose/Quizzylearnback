// In-memory scores storage
let scores = [];

class ScoreController {
  // Get scores for a user
  async getUserScores(req, res) {
    try {
      const { userId } = req.params;
      
      const userScores = scores.filter(score => score.userId === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10); // Last 10 scores

      res.json({
        success: true,
        scores: userScores,
        count: userScores.length
      });

    } catch (error) {
      console.error('Get scores error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get scores'
      });
    }
  }

  // Save score
  async saveScore(req, res) {
    try {
      const { userId, quizId, score, correctAnswers, totalQuestions, timeTaken, xpEarned } = req.body;

      const newScore = {
        id: Date.now().toString(),
        userId,
        quizId,
        score,
        correctAnswers,
        totalQuestions,
        timeTaken,
        xpEarned,
        date: new Date().toISOString()
      };

      scores.push(newScore);

      res.status(201).json({
        success: true,
        message: 'Score saved',
        score: newScore
      });

    } catch (error) {
      console.error('Save score error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save score'
      });
    }
  }
}

module.exports = new ScoreController();