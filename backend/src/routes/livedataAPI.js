const express = require('express');
const router = express.Router();
const MQTTMessage = require('../models/mqttmodel');

// GET /api/live-data
router.get('/livedata', async (req, res) => {
  try {
    const latestMessages = await MQTTMessage.find()
      .sort({ timestamp: -1 })
      .limit(3)
      .lean();
    res.json({ messages: latestMessages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch live data' });
  }
});

module.exports = router;
