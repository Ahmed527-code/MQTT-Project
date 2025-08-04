import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterForm from '../FilterForm/filter';
import '../../styles/history.css';

const History = ({ showTable, setShowTable, children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parameters, setParameters] = useState([]);


  // Fetch available parameters for filter dropdown
  useEffect(() => {
    if (showTable) {
      axios.get('http://localhost:3000/api/parameter')
        .then(res => setParameters(res.data.parameters || []))
        .catch(() => setParameters([]));
    }
  }, [showTable]);

  // Fetch history data (all or filtered)
  const fetchHistory = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.parameter) params.append('parameter', filters.parameter);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      const url = params.toString()
        ? `http://localhost:3000/api/history?${params.toString()}`
        : 'http://localhost:3000/api/history';
      const res = await axios.get(url);
      setData(res.data.messages || []);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchHistory();
    }
  }, [showTable]);

  if (showTable) {
    return (
      <div className="history-table-large">
        <FilterForm parameters={parameters} onFilter={fetchHistory} />
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
