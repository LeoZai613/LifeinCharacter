const express = require('express');
const router = express.Router();

// In-memory storage for avatar data (replace with database in production)
let avatarData = {};

// Get avatar data
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userAvatar = avatarData[userId] || {};
  res.json(userAvatar);
});

// Save avatar changes
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const avatarChanges = req.body;
  
  // Validate avatar data
  if (!avatarChanges.race || !avatarChanges.class) {
    return res.status(400).json({ error: 'Missing required avatar properties' });
  }

  // Save avatar data
  avatarData[userId] = {
    ...avatarData[userId],
    ...avatarChanges,
    lastUpdated: new Date()
  };

  res.json(avatarData[userId]);
});

module.exports = router;
