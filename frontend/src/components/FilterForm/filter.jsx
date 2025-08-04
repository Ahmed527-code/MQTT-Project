
import React, { useState } from 'react';

const FilterForm = ({ parameters = [], onFilter }) => {
  const [selectedParam, setSelectedParam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ parameter: selectedParam, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <select value={selectedParam} onChange={e => setSelectedParam(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px' }}>
        <option value="">Select Parameter</option>
        {parameters.map(param => (
          <option key={param} value={param}>{param}</option>
        ))}
      </select>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px' }} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px' }} />
      <button type="submit" className="view-all-btn">Filter</button>
    </form>
  );
};

export default FilterForm;
