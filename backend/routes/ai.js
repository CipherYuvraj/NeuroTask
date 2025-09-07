const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

// AI service URL from environment variables
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Middleware to verify authentication
router.use(authMiddleware);

// Get overall procrastination analysis
router.post('/analyze', async (req, res) => {
  try {
    // Get user ID from authenticated request
    const userId = req.user.uid;
    
    // Fetch user's tasks, journals, and behaviors from database
    // ... (database queries)
    
    // Format data for AI service
    const analysisData = {
      user_id: userId,
      tasks: tasks,
      journals: journals,
      behaviors: behaviors
    };
    
    // Send to AI service
    const response = await axios.post(`${AI_SERVICE_URL}/analyze`, analysisData);
    
    // Return AI analysis results
    res.json(response.data);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze procrastination data' });
  }
});

// Analyze single task risk
router.post('/analyze/task', async (req, res) => {
  try {
    const taskData = req.body;
    const response = await axios.post(`${AI_SERVICE_URL}/analyze/task`, taskData);
    res.json(response.data);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze task' });
  }
});

// Analyze journal sentiment
router.post('/analyze/sentiment', async (req, res) => {
  try {
    const journalData = req.body;
    const response = await axios.post(`${AI_SERVICE_URL}/analyze/sentiment`, journalData);
    res.json(response.data);
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze journal' });
  }
});

module.exports = router;