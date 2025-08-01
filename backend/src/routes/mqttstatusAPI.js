const express = require('express');
const router = express.Router();
const { getMqttStatus } = require('../services/mqttClient');

// GET /api/mqtt-status
router.get('/status', (req, res) => {
  res.json({ connected: getMqttStatus() });
});

module.exports = router;
