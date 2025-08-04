require('dotenv').config();
const mqtt = require('mqtt');

// Load environment variables
const host = process.env.HIVEMQ_HOST;
const port = process.env.HIVEMQ_PORT;
const username = process.env.HIVEMQ_USERNAME;
const password = process.env.HIVEMQ_PASSWORD;

// MQTT connection options
const options = {
  host,
  port,
  protocol: 'mqtts',
  username,
  password,
};

const client = mqtt.connect(options);

// Base structure of the message
const baseMessage = {
  active_power: 0,
  active_energy_in: 0,
  apparent_power: 0,
  apparent_energy_in: 0,
  phase_current: 0,
  voltage: 230,
  power_factor: 0.95,
  frequency: 50,
  neutral_current: 0,
  switch: 1,
  active_energy_out: 0,
  apparent_energy_out: 0,
  L1_current: 0,
  L2_current: 0,
  L3_current: 0,
  L1_voltage: 230,
  L2_voltage: 231,
  L3_voltage: 229,
  L1_power_factor: 0.98,
  L2_power_factor: 0.97,
  L3_power_factor: 0.96,
  meter_type: 1,
  TZ1_KWH_IMPORT: 0,
  TZ2_KWH_IMPORT: 0,
  TZ3_KWH_IMPORT: 0,
  TZ1_KWH_EXPORT: 0,
  TZ2_KWH_EXPORT: 0,
  TZ3_KWH_EXPORT: 0,
  CUM_KWH_IMPORT: 5000,
  CUM_KWH_EXPORT: 4500
};

// Generate random integer within a range
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate dynamic message
const generateMessage = () => ({
  ...baseMessage,
  active_power: getRandom(400, 800),
  active_energy_in: getRandom(800, 1500),
  apparent_power: getRandom(700, 1000),
  apparent_energy_in: getRandom(1000, 1800),
  phase_current: getRandom(10, 30),
  neutral_current: getRandom(3, 10),
  active_energy_out: getRandom(300, 700),
  apparent_energy_out: getRandom(600, 900),
  L1_current: getRandom(8, 15),
  L2_current: getRandom(9, 16),
  L3_current: getRandom(9, 14),
  TZ1_KWH_IMPORT: getRandom(100, 400),
  TZ2_KWH_IMPORT: getRandom(100, 400),
  TZ3_KWH_IMPORT: getRandom(100, 400),
  TZ1_KWH_EXPORT: getRandom(100, 300),
  TZ2_KWH_EXPORT: getRandom(100, 300),
  TZ3_KWH_EXPORT: getRandom(100, 300),
  CUM_KWH_IMPORT: getRandom(5000, 5500),
  CUM_KWH_EXPORT: getRandom(4500, 5000)
});

client.on('connect', () => {
  console.log('✅ Connected to HiveMQ Cloud');

  setInterval(() => {
    const topic = 'device/data';
    const message = JSON.stringify(generateMessage());

    client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.error('❌ Failed to publish message:', err);
      } else {
        console.log(`📡 Published to ${topic} →`, message);
      }
    });
  }, 5000);
});

client.on('error', (err) => {
  console.error('❌ Connection error:', err);
  client.end();
});
