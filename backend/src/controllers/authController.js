const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route POST /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email and password.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered.' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: { token, user: { _id: user._id, name: user.name, email: user.email } },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: { token, user: { _id: user._id, name: user.name, email: user.email } },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @route GET /api/v1/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { register, login, getMe };
