import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/history.css';

const History = ({ showTable, setShowTable, children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3000/api/history');
      setData(res.data.messages || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchAllData();
    }

  }, [showTable]);

  if (showTable) {
    return (
      <div className="history-table-large">
        <table className="history-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row._id || idx}>
                <td className="history-td-center">{idx + 1}</td>
                <td>{row.parameter}</td>
                <td className="history-td-value">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="view-all-btn-row">
          <button className="view-all-btn" onClick={() => setShowTable(false)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="view-all-btn-row">
        <button className="view-all-btn" onClick={() => setShowTable(true)}>View All Data</button>
      </div>
    </div>
  );
};

export default History;
