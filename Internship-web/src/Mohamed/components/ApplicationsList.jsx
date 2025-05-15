import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ApplicationsList.css'; // Import external CSS for styling
const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApps);
  }, []);

  if (applications.length === 0) {
    return(
      <div className="applications-container" style={{ paddingTop: '200px' }}>
        <h3 className="applications-title">Your Applications</h3>
        <p className="no-apps">No applications submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="applications-container" style={{ paddingTop: '200px' }}>
      <h3 className="applications-title">Your Applications</h3>
      <ul className="applications-list">
        {applications.map((app) => (
          <li key={app.id} className="application-item">
            <div>
              <strong className="app-title">{app.title}</strong>
              <span className="app-status"> — Status: {app.status}</span>
            </div>
            <Link to={`/applications/${app.id}`} className="view-link">
              View Status
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsList;







