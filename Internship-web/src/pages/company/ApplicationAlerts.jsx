// src/pages/company/ApplicationAlerts.jsx
import React from 'react';

const ApplicationAlerts = () => {
  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          📢 Application Alerts
        </h2>

        <div className="status-text">
          You will be notified here when a student applies to one of your internship posts.
        </div>

        {/* Mock application alert */}
        <div className="card" style={{ marginTop: '16px', backgroundColor: '#ECFDF5', borderLeft: '4px solid #10B981', padding: '12px' }}>
          <p style={{ marginBottom: '0' }}>
            📨 <strong>Sara Ali</strong> applied for the <strong>Frontend Developer Internship</strong>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ApplicationAlerts;
