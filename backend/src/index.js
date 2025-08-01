const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./services/db');

// Load env variables
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
// Uncomment and add your routes as you implement them
const historyAPI = require('./routes/historyAPI');
const livedataAPI = require('./routes/livedataAPI');
const parameter = require('./routes/parameter');
const mqttStatusAPI = require('./routes/mqttstatusAPI');
app.use('/api', historyAPI);
app.use('/api', livedataAPI);
app.use('/api', parameter);
app.use('/api', mqttStatusAPI);

app.get('/', (req, res) => {
  res.send('MQTT Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
