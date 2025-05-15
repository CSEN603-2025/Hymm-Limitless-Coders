import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkshopPage.css'; // Import the external CSS

export default function WorkshopPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Workshop Dashboard</h2>

      <div className="dashboard-section">
        <h3>Live Workshops</h3>
        <button className="btn-primary" onClick={() => navigate('/workshop/live')}>
          Join Live Workshop
        </button>
      </div>

      <div className="dashboard-section">
        <h3>Completed Workshops</h3>
        <button className="btn-secondary" onClick={() => navigate('/workshop/completed')}>
          View Completed
        </button>
      </div>

      <div className="dashboard-section">
        <h3>Upcoming Workshops</h3>
        <button className="btn-outline" onClick={() => navigate('/workshop/upcoming')}>
          View Upcoming Workshop
        </button>
      </div>

      <div className="dashboard-section">
        <h3>Recorded Workshops</h3>
        <button className="btn-outline" onClick={() => navigate('/workshop/recorded')}>
          View Recordings
        </button>
      </div>

      <div className="dashboard-section">
        <button
          onClick={() => navigate('/prostudentextras')}
          className="btn-outline back-button"
        >
          ← Back to Pro Student Page
        </button>
      </div>
    </div>
  );
}
