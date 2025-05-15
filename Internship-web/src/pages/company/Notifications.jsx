import React from 'react';

const Notifications = () => {
  const handleSendNotification = () => {
    alert('Acceptance/Rejection email sent!');
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: 'green' }}>
  Your application has been Accepted
</h2>


        {/* <p>Your Email notifications</p> */}

        <div className="application-card" style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9' 
        }}>
          {/* <p><strong>Applicant:</strong> Sara Ali</p>
          <p><strong>Status:</strong> <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Pending</span></p> */}
        </div>

        {/* <button className="btn-primary" onClick={handleSendNotification} style={{ marginTop: '1rem' }}>
          Send Notification
        </button> */}
      </section>
    </main>
  );
};

export default Notifications;
