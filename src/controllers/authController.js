const User = require('../models/User');

class AuthController {

  // REGISTER
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({
        name,
        email,
        password, // (hash later)
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      });

      // 🔥 THIS SAVES TO MONGODB
      await user.save();

      console.log('✅ User saved to MongoDB:', user.email);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
      });

    } catch (error) {
      console.error('REGISTER ERROR:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  // LOGIN
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({
        success: true,
        message: 'Login successful',
        user
      });

    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }

  // CURRENT USER
  async getCurrentUser(req, res) {
    const user = await User.findOne();
    res.json({ user });
  }
}

module.exports = new AuthController();

