// src/pages/company/Interns.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockInternsByCompany = {
  'company1@test.com': [
    { id: 1, name: 'Sara Ali',   field: 'Tech',    status: 'Current', jobTitle: 'Frontend Developer' },
    { id: 2, name: 'Omar Yehia', field: 'Pharma',  status: 'Complete', jobTitle: 'Research Assistant' },
    { id: 3, name: 'Lina Nasser',field: 'Business',status: 'Current', jobTitle: 'Marketing Intern' },
  ],
  'company2@test.com': [
    { id: 4, name: 'Hassan Ali', field: 'Data Analysis',status: 'Current', jobTitle: 'Data Analyst Intern' },
    { id: 3, name: 'Lina Nasser',field: 'Business',     status: 'Current', jobTitle: 'Marketing Intern' },
  ],
};

const Interns = () => {
  const navigate = useNavigate();

  // 1. Read logged-in company email
  const storedProfile = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(storedProfile);

  // 2. Initialize with the correct dummy set
  const initialInterns = mockInternsByCompany[email] || [];
  const [interns, setInterns] = useState(initialInterns);

  const [searchTerm,   setSearchTerm]   = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredInterns = interns.filter(intern => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus
      ? intern.status === filterStatus
      : true;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setInterns(prev =>
      prev.map(i => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Interns
        </h2>

        <div className="filter-container">
          <input
            type="text"
            className="input"
            placeholder="Search by name or job..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search intern by name or job title"
          />

          <select
            className="input"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            aria-label="Filter by intern status"
          >
            <option value="">All Statuses</option>
            <option value="Current">Current intern</option>
            <option value="Complete">Internship complete</option>
          </select>
        </div>

        <ul className="intern-list">
          {filteredInterns.map(intern => (
            <li key={intern.id} className="card intern-card">
              <p><strong>{intern.name}</strong> — {intern.field}</p>
              <p style={{ margin: '4px 0', fontStyle: 'italic' }}>
                {intern.jobTitle}
              </p>

              <div className="status-select">
                <label htmlFor={`status-${intern.id}`} className="label">
                  Status:
                </label>
                <select
                  id={`status-${intern.id}`}
                  className="input"
                  value={intern.status}
                  onChange={e => handleStatusChange(intern.id, e.target.value)}
                >
                  <option value="Current">Current intern</option>
                  <option value="Complete">Internship complete</option>
                </select>
              </div>

              <button
                className="btn-outline"
                onClick={() => navigate(`/company/intern/${intern.id}`)}
                aria-label={`View profile for ${intern.name}`}
              >
                View Profile
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Interns;
