const express = require('express');
const router = express.Router();

// In-memory storage for avatar data (replace with database in production)
let avatarData = {};

// Get avatar data
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    console.log('GET request for userId:', userId);
    
    const userAvatar = avatarData[userId] || {};
    console.log('Returning avatar data:', userAvatar);
    
    res.json(userAvatar);
  } catch (error) {
    console.error('Error in GET /avatar/:userId:', error);
    res.status(500).json({ error: 'Failed to retrieve avatar data' });
  }
});

// Save avatar changes
router.post('/:userId', (req, res) => {
  try {
    console.log('POST request for avatar update');
    console.log('Headers:', req.headers);
    console.log('User ID:', req.params.userId);
    console.log('Request body:', req.body);
    
    const { userId } = req.params;
    const avatarChanges = req.body;
    
    // Validate request body
    if (!avatarChanges || Object.keys(avatarChanges).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }
    
    // Validate required fields
    const requiredFields = ['race', 'class'];
    const missingFields = requiredFields.filter(field => !avatarChanges[field]);
    
    if (missingFields.length > 0) {
      console.error('Validation failed - missing fields:', missingFields);
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Save avatar data
    avatarData[userId] = {
      ...avatarData[userId],
      ...avatarChanges,
      lastUpdated: new Date()
    };

    console.log('Successfully saved avatar data:', avatarData[userId]);
    res.json(avatarData[userId]);
  } catch (error) {
    console.error('Error in POST /avatar/:userId:', error);
    res.status(500).json({ error: 'Failed to save avatar changes' });
  }
});

module.exports = router;
