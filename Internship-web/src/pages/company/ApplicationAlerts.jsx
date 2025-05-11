// src/pages/company/ApplicationAlerts.jsx
import React from 'react';

const ApplicationAlerts = () => {
  return (
    <main className="form-container">
      <section className="card">
        <h2 className="card-header">📢 Application Alerts</h2>

        <div className="status-text">
          You will be notified here when a student applies to one of your internship posts.
        </div>

        <div className="card" style={{ marginTop: '16px', backgroundColor: '#F9FAFB' }}>
          <p style={{ marginBottom: '0' }}>📬 <strong>No new alerts.</strong> You’re all caught up!</p>
        </div>
      </section>
    </main>
  );
};

export default ApplicationAlerts;
