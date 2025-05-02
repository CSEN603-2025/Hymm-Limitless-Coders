// components/ApplicationStatus.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicationStatus = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const found = storedApps.find(app => app.id.toString() === id);
    setApplication(found);
  }, [id]);

  if (!application) return <p>Application not found.</p>;

  return (
    <div>
      <h3>Application Status</h3>
      <p><strong>Internship:</strong> {application.title}</p>
      <p><strong>Status:</strong> {application.status}</p>
      <p><strong>Applied On:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
      <p><strong>Motivation Statement:</strong> {application.statement}</p>
      <p><strong>Uploaded File:</strong> {application.fileName}</p>
    </div>
  );
};

export default ApplicationStatus;
