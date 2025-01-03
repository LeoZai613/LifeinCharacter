const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message 
  });
});

// Routes
const avatarRoutes = require('./routes/avatar');
const authRoutes = require('./routes/auth');

app.use('/api/avatar', avatarRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
