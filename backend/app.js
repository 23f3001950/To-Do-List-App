const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const { protect } = require('./src/middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(
      origin.includes('vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', protect, taskRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'TodoList API is running 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
