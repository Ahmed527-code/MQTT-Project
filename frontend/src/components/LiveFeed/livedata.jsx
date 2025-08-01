import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/livedata.css';

const CircularGraph = ({ value, max = 100 }) => {
  const radius = 30;
  const stroke = 6;
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedValue / max) * circumference;

  return (
    <svg width={80} height={80} className="circular-graph">
      <circle
        cx={40}
        cy={40}
        r={radius}
        stroke="#eee"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={40}
        cy={40}
        r={radius}
        stroke="#fff700"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.3em"
        fontSize="1.2em"
        fill="#333"
      >
        {value}
      </text>
    </svg>
  );
};

const LiveData = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/livedata');
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error('Failed to fetch live data:', err);
        setMessages([]);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-data-container">
      {messages.map((msg, idx) => (
        <div className="live-data-card" key={idx}>
          <div className="live-data-info">
            <div className="live-data-parameter">{msg.parameter}</div>
            <div className="live-data-value">{msg.value}</div>
          </div>
          <CircularGraph value={msg.value} max={200} />
        </div>
      ))}
    </div>
  );
};

export default LiveData;
