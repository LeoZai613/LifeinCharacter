const express = require('express');
const router = express.Router();

// In-memory user storage (replace with database in production)
const users = new Map();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // In production, you'd want to use proper session management and JWT
  res.json({
    email: user.email,
    username: user.username,
    character: user.character
  });
});

// Signup route
router.post('/signup', (req, res) => {
  const { email, password, username } = req.body;
  
  if (users.has(email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    email,
    password, // In production, hash the password
    username,
    character: null
  };

  users.set(email, newUser);
  
  res.json({
    email: newUser.email,
    username: newUser.username,
    character: newUser.character
  });
});

module.exports = router;
