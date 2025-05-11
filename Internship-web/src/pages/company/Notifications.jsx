import React from 'react';

const Notifications = () => {
  const handleSendNotification = () => {
    alert('Acceptance/Rejection email sent! (simulated)');
  };

  return (
    <main className="form-container">
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
