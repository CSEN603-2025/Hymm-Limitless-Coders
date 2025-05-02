// components/ApplicationsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(storedApps);
  }, []);

  if (applications.length === 0) return <p>No applications submitted yet.</p>;

  return (
    <div>
      <h3>Your Applications</h3>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <strong>{app.title}</strong> - Status: {app.status}
            {' '}| <Link to={`/applications/${app.id}`}>View Status</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsList;
