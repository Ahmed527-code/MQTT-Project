
const express = require('express');
const router = express.Router();
const MQTTMessage = require('../models/mqttmodel');

// GET /api/history?start=...&end=...&parameter=...
router.get('/history', async (req, res) => {
  try {
    const { start, end, parameter } = req.query;
    const filter = {};
    if (start || end) {
      filter.timestamp = {};
      if (start) filter.timestamp.$gte = new Date(start);
      if (end) filter.timestamp.$lte = new Date(end);
    }
    if (parameter) {
      filter.parameter = parameter;
    }
    const results = await MQTTMessage.find(filter).sort({ timestamp: -1 }).lean();
    res.json({ messages: results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
