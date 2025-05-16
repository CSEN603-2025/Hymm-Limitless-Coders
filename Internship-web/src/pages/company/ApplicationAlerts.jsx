// src/pages/company/ApplicationAlerts.jsx
import React from 'react';

const mockAlerts = {
  'company1@test.com': [
    { id: 1, applicant: 'Sara Ali', postTitle: 'Frontend Developer Internship' },
    { id: 2, applicant: 'Omar Yehia', postTitle: 'Pharma Research Intern' }
  ],
  'company2@test.com': [
    { id: 1, applicant: 'Hassan Ali', postTitle: 'Data Analyst Intern' }
  ]
};

const ApplicationAlerts = () => {
  // Read stored profile (set during login) and extract email
  const stored = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(stored);

  // Pick the right alerts array (or empty if none)
  const alerts = mockAlerts[email] || [];

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          📢 Application Alerts
        </h2>

        <div className="status-text">
          You will be notified here when a student applies to one of your internship posts.
        </div>

        {alerts.length === 0 ? (
          <div
            className="card"
            style={{
              marginTop: '16px',
              backgroundColor: '#F3F4F6',
              padding: '12px',
              borderLeft: '4px solid #9CA3AF'
            }}
          >
            <p style={{ margin: 0, color: '#6B7280' }}>
              📨 <strong>No new alerts.</strong> You’re all caught up!
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="card"
              style={{
                marginTop: '16px',
                backgroundColor: '#ECFDF5',
                borderLeft: '4px solid #10B981',
                padding: '12px'
              }}
            >
              <p style={{ margin: 0 }}>
                📨 <strong>{alert.applicant}</strong> applied for the{' '}
                <strong>{alert.postTitle}</strong>.
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default ApplicationAlerts;
