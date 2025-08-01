require('dotenv').config();

try {
  require('dotenv').config();
} catch (err) {
  console.error('Error loading .env file:', err);
  process.exit(1);
}

const mqtt = require('mqtt');

const requiredENVvars = ['HIVEMQ_HOST', 'HIVEMQ_PORT', 'HIVEMQ_USERNAME', 'HIVEMQ_PASSWORD'];

requiredENVvars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is not set`);
    process.exit(1);
  }
});


const options = {
  host: process.env.HIVEMQ_HOST,
  port: process.env.HIVEMQ_PORT,
  protocol: 'mqtts',
  username: process.env.HIVEMQ_USERNAME,
  password: process.env.HIVEMQ_PASSWORD,
};

let isConnected = false;

const client = mqtt.connect(options);

client.on('connect', () => {
  isConnected = true;
  console.log('Connected to HiveMQ Cloud!');
});

client.on('error', (err) => {
  isConnected = false;
  console.error('MQTT connection error:', err);
});

client.on('disconnect', () => {
  isConnected = false;
  console.log('Disconnected from MQTT broker');
  setTimeout(() => {
    client.reconnect();
  }, 5000); 
});

client.on('tls error', (err) => {
  isConnected = false;
  console.error('TLS error:', err);
});

function getMqttStatus() {
  return isConnected;
}

// --- MQTT message storage logic ---
const MQTTMessage = require('../models/mqttmodel');

client.on('connect', () => {
  isConnected = true;
  console.log('Connected to HiveMQ Cloud!');
  client.subscribe('device/data', (err) => {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic: device/data');
    }
  });
});

client.on('message', async (topic, message) => {
  if (topic === 'device/data') {
    try {
      const data = JSON.parse(message.toString());
      const timestamp = new Date();
      const entries = Object.entries(data);
      for (const [parameter, value] of entries) {
        if (typeof value === 'number') {
          await MQTTMessage.create({ parameter, value, timestamp });
        }
      }
    } catch (err) {
      console.error('Error processing MQTT message:', err);
    }
  }
});

module.exports = {
  client,
  getMqttStatus,
};
