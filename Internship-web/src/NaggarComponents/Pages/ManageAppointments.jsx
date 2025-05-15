import { useState, useEffect } from 'react';

import '../Styles/manageAppointment.css'; // Link to styles.css

const dummyAppointments = [
  { 
    id: 1, 
    advisor: 'Dr. Smith', 
    date: '2025-05-15', 
    time: '10:00', 
    purpose: 'Career Guidance', 
    status: 'Pending',
    userOnline: false 
  },
  { 
    id: 2, 
    advisor: 'Prof. Johnson', 
    date: '2025-05-16', 
    time: '14:00', 
    purpose: 'Report Clarification', 
    status: 'Pending',
    userOnline: true 
  },
];

function ManageAppointments({ addNotification }) {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : dummyAppointments;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update localStorage when appointments change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Simulate async data fetching
  const fetchAppointments = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000); // Simulated delay
  };

  // Filter appointments by advisor or purpose
  const filteredAppointments = appointments.filter((apt) =>
    apt.advisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'Accepted' } : apt
    ));
    addNotification(`Appointment ${id} accepted`);
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'Rejected' } : apt
    ));
    addNotification(`Appointment ${id} rejected`);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchAppointments();
  };

  return (
    <div className="page-wrapper">
      <main className="main-container">
        <header className="header">
          <h1 className="header-title">Manage Appointments</h1>
        </header>

        <section className="filter-search-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by advisor or purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search appointments"
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
                data-tooltip="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <section className="card-list">
          {isLoading ? (
            <div className="loading-spinner" aria-live="polite">Loading...</div>
          ) : filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <article key={apt.id} className="card">
                <header className="card-header">
                  <h3 className="card-title">{apt.advisor}</h3>
                </header>
                <div className="card-content">
                  <p className="card-status">Date: <span>{apt.date}</span></p>
                  <p className="card-status">Time: <span>{apt.time}</span></p>
                  <p className="card-status">Purpose: <span>{apt.purpose}</span></p>
                  <p className="card-status">Status: <span>{apt.status}</span></p>
                  <p className="card-status">User Online: <span>{apt.userOnline ? 'Yes' : 'No'}</span></p>
                  {apt.status === 'Pending' && (
                    <div className="card-actions">
                      <button
                        className="btn-primary"
                        onClick={() => handleAccept(apt.id)}
                        data-tooltip="Accept appointment"
                      >
                        Accept
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => handleReject(apt.id)}
                        data-tooltip="Reject appointment"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="no-results">No appointments found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManageAppointments;