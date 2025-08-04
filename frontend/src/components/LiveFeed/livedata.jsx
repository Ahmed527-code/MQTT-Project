import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/livedata.css";

const LiveData = () => {
  const [messages, setMessages] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/livedata");
        setMessages(res.data.messages || []);
        const graphDataArray = res.data.messages.map((message) => ({
          value: message.value,
        }));
        setGraphData(graphDataArray);
      } catch (err) {
        console.error("Failed to fetch live data:", err);
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
          <div>
            <svg width={80} height={80} className="circular-graph">
              <circle
                cx={40}
                cy={40}
                r={30}
                stroke="#eee"
                strokeWidth={6}
                fill="none"
              />
              <circle
                cx={40}
                cy={40}
                r={30}
                stroke="#fff700"
                strokeWidth={6}
                fill="none"
                strokeDasharray={2 * Math.PI * 30}
                strokeDashoffset={
                  2 * Math.PI * 30 -
                  (graphData[idx].value / 100) * 2 * Math.PI * 30
                }
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
                {graphData[idx].value}
              </text>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveData;
