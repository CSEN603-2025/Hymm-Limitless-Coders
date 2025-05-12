import React from 'react';
import CompanyHome from './CompanyHome';
const Notifications = () => {
  const handleSendNotification = () => {
    alert('Acceptance/Rejection email sent! (simulated)');
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
        <CompanyHome />
      <section className="card">
        <h2 className="card-header">Send Application Decision</h2>
        <p>You can simulate sending an acceptance or rejection email to applicants.</p>
        <button className="btn-primary" onClick={handleSendNotification}>
          Send Notification
        </button>
      </section>
    </main>
  );
};

export default Notifications;
