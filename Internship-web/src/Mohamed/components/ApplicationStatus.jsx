// // components/ApplicationStatus.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ApplicationStatus = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
//     const found = storedApps.find(app => app.id.toString() === id);
//     setApplication(found);
//   }, [id]);

//   if (!application) return <p>Application not found.</p>;

//   return (
//     <div>
//       <h3>Application Status</h3>
//       <p><strong>Internship:</strong> {application.title}</p>
//       <p><strong>Status:</strong> {application.status}</p>
//       <p><strong>Applied On:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
//       <p><strong>Motivation Statement:</strong> {application.statement}</p>
//       <p><strong>Uploaded File:</strong> {application.fileName}</p>
//     </div>
//   );
// };

// export default ApplicationStatus;





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ApplicationStatus.css'; // Import external CSS

const ApplicationStatus = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
    const found = storedApps.find(app => app.id.toString() === id);
    setApplication(found);
  }, [id]);

  if (!application) {
    return <p className="not-found">Application not found.</p>;
  }

  return (
    <div className="status-container">
      <h3 className="status-title">Application Status</h3>
      <div className="status-detail">
        <p><span className="label">Internship:</span> {application.title}</p>
        <p><span className="label">Status:</span> {application.status}</p>
        <p><span className="label">Applied On:</span> {new Date(application.appliedAt).toLocaleString()}</p>
        <p><span className="label">Motivation Statement:</span> {application.statement}</p>
        <p><span className="label">Uploaded File:</span> {application.fileName}</p>
      </div>
    </div>
  );
};

export default ApplicationStatus;

