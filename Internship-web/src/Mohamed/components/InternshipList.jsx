import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import internships from '../data/internships';

const InternshipList = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const filteredInternships = internships.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? i.type === filter : true)
  );

  const handleView = (intern) => {
    navigate(`/internship/${intern.id}`);
  };

  const handleApply = (intern) => {
    navigate(`/internships/apply/${intern.id}`);
  };

  const clearFilters = () => {
    setSearch('');
    setFilter('');
  };

  return (
    <div>
      <h2>All Internships</h2>

      {/* Search Input */}
      <div>
        <input
          placeholder="Search internships by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={clearFilters} style={{ padding: '8px' }}>
          Clear
        </button>
      </div>

      {/* Filter Dropdown */}
      <div style={{ marginTop: '10px' }}>
        <select
          onChange={e => setFilter(e.target.value)}
          value={filter}
          style={{ padding: '8px' }}
        >
          <option value="">All Types</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      {/* Internship List */}
      <ul style={{ marginTop: '15px' }}>
        {filteredInternships.map(intern => (
          <li
            key={intern.id}
            style={{
              border: '1px solid #ccc',
              margin: '10px 0',
              padding: '10px',
              listStyle: 'none',
            }}
          >
            <strong>{intern.title}</strong>
            <p>{intern.description}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => handleView(intern)}
                style={{ padding: '6px 12px' }}
              >
                View
              </button>
              <button
                onClick={() => handleApply(intern)}
                style={{ padding: '6px 12px' }}
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternshipList;

