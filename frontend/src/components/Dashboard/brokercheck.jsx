import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/brokercheck.css';

const BrokerCheck = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (axios == null) {
          throw new Error('axios is null');
        }
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/status');
        if (res == null || res.data == null) {
          throw new Error('Failed to fetch broker status');
        }
        setIsConnected(!!res.data.connected);
      } catch (err) {
        setError('Failed to fetch broker status: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    // Optionally, poll every 5 seconds:
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className='loading'>Checking broker status...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
      <div className="broker-status-center">
        {isConnected ? (
          <span className="broker-status-success">✅ Connected to Broker</span>
        ) : (
          <span className="broker-status-fail">❌ Not Connected to Broker</span>
        )}
      </div>
    );
};

export default BrokerCheck;