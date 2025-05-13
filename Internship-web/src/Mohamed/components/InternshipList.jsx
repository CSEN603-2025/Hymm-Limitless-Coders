import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import internships from '../data/internships';
import "../css/Internships.css"; // External CSS file for styling (recommended)

const InternshipList = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user role when component mounts
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

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

  // Check if user can apply based on role
  const canApply = () => {
    return userRole === 'student' || userRole === 'pro student';
  };

  return (
    <div className="internship-list-container" style={{ paddingTop: '200px' }}>
      <h2 className="internship-list-header">All Internships</h2>
      
      {/* Search Input */}
      <div className="search-container">
        <input
          placeholder="Search internships by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={clearFilters} className="clear-button">
          Clear
        </button>
      </div>
      
      {/* Filter Dropdown */}
      <div className="filter-container">
        <select
          onChange={e => setFilter(e.target.value)}
          value={filter}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>
      
      {/* Internship List */}
      <ul className="internship-list">
        {filteredInternships.map(intern => (
          <li key={intern.id} className="internship-item">
            <strong>{intern.title}</strong>
            <p>{intern.description}</p>
            <div className="internship-buttons">
              <button
                onClick={() => handleView(intern)}
                className="view-button"
              >
                View
              </button>
              
              {/* Only show Apply button if user role is student or pro student */}
              {canApply() && (
                <button
                  onClick={() => handleApply(intern)}
                  className="apply-button"
                >
                  Apply
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternshipList;