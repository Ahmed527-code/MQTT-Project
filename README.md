# MQTT Live Dashboard

A full-stack MQTT dashboard for real-time monitoring and historical analysis of IoT data.

## Features

- **Live MQTT Data Feed:** View the latest MQTT messages in real time.
- **Broker Status:** See the current connection status of your MQTT broker.
- **History Table:** Fetch and filter all historical MQTT data in a responsive table.
- **Parameter List:** View all available parameters from your MQTT data.
- **Modern UI:** Clean, responsive React frontend styled for clarity and usability.

## Tech Stack

- **Frontend:** React, Vite, Axios, CSS Modules
- **Backend:** Node.js, Express, MQTT.js, Mongoose, MongoDB

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- MQTT broker (e.g., HiveMQ, Mosquitto)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd MQTT-Project
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Configuration

- Copy `.env.example` to `.env` in the backend folder and set your MongoDB URI and MQTT broker details.

### Running the App

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```
2. **Start the frontend dev server:**
   ```sh
   cd frontend
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Folder Structure

```
MQTT-Project/
  backend/
    src/
      controllers/
      models/
      routes/
      services/
      utils/
    package.json
  frontend/
    src/
      components/
      styles/
      utils/
    package.json
    vite.config.js
```

## API Endpoints

- `GET /api/mqtt-status` — Broker connection status
- `GET /api/live-data` — Latest 3 MQTT messages
- `GET /api/history` — All historical data (with filters)
- `GET /api/parameters` — List of all parameters

## License

MIT

---

Built with ❤️ for IoT and real-time data enthusiasts.
