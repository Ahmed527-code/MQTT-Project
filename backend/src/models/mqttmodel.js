const mongoose = require('mongoose');

const mqttMessageSchema = new mongoose.Schema({
  parameter: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('MQTTMessage', mqttMessageSchema);
