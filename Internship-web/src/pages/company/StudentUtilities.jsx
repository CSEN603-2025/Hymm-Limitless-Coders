import React from 'react';

const StudentUtilities = () => {
  const handleCycleNotification = () => {
    alert('New internship cycle has begun! Check your dashboard. (simulated)');
  };

  return (
      <main className="utilities-container" style={{ paddingTop: '200px' }}>
        
      <section className="card">
        <h2 className="card-header">Student Utilities</h2>

        <button
          className="btn-secondary"
          onClick={handleCycleNotification}
          aria-label="Notify about new internship cycle"
        >
          Show New Cycle Notification (M1-50)
        </button>
      </section>

      <hr className="divider" />

      <section className="card">
        <h3 className="card-header">What Counts as an Internship? (M1-65)</h3>
        <div className="video-container">
          <video className="video" width="100%" controls aria-label="Informational internship video">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </section>
    </main>
  );
};

export default StudentUtilities;
