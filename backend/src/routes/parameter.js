const express = require('express');
const router = express.Router();
const MQTTMessage = require('../models/mqttmodel');

// GET /api/parameters
router.get('/parameter', async (req, res) => {
  try {
    const parameters = await MQTTMessage.distinct('parameter');
    res.json({ parameters });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch parameters' });
  }
});

module.exports = router;
