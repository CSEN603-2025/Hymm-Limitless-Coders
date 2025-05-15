import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockInterns = [
  { id: 1, name: 'Sara Ali', field: 'Tech', status: 'Current' },
  { id: 2, name: 'Omar Yehia', field: 'Pharma', status: 'Complete' },
  { id: 3, name: 'Lina Nasser', field: 'Business', status: 'Current' },
];

const Interns = () => {
  const [interns, setInterns] = useState(mockInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const filteredInterns = interns.filter((intern) => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? intern.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setInterns((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
        
      <section className="card">
        <h2 className="card-header">Interns</h2>

        <div className="filter-container">
          <input
            type="text"
            className="input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search intern by name"
          />

          <select
            className="input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by intern status"
          >
            <option value="">All Statuses</option>
            <option value="Current">Current</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <ul className="intern-list">
          {filteredInterns.map((intern) => (
            <li key={intern.id} className="card intern-card">
              <p><strong>{intern.name}</strong> — {intern.field}</p>

              <div className="status-select">
                <label htmlFor={`status-${intern.id}`} className="label">Status:</label>
                <select
                  id={`status-${intern.id}`}
                  className="input"
                  value={intern.status}
                  onChange={(e) => handleStatusChange(intern.id, e.target.value)}
                >
                  <option value="Current">Current</option>
                  <option value="Complete">Complete</option>
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
