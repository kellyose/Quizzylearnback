class UserController {
  // Get user by ID
  async getUser(req, res) {
    try {
      const { id } = req.params;
      
      // For demo, find user in memory
      const user = users.find(u => u.id === id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        user
      });

    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get user'
      });
    }
  }

  // Update user stats
  async updateStats(req, res) {
    try {
      const { id } = req.params;
      const { stats } = req.body;

      // Find and update user
      const userIndex = users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Update stats
      users[userIndex].stats = {
        ...users[userIndex].stats,
        ...stats
      };

      res.json({
        success: true,
        message: 'Stats updated',
        user: users[userIndex]
      });

    } catch (error) {
      console.error('Update stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update stats'
      });
    }
  }
}

// Need to import users from authController or use shared storage
let users = [];

module.exports = {
  UserController: new UserController(),
  setUsers: (userArray) => { users = userArray; }
};