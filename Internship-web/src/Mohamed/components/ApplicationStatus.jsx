// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/ApplicationStatus.css'; // Import external CSS
// const ApplicationStatus = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
//     const found = storedApps.find(app => app.id.toString() === id);
//     setApplication(found);
//   }, [id]);

//   if (!application) {
//     return <p className="not-found">Application not found.</p>;
//   }

//   return (
//     <div className="status-container" style={{ paddingTop: '200px' }}>
//       <h3 className="status-title">Application Status</h3>
//       <div className="status-detail">
//         <p><span className="label">Internship:</span> {application.title}</p>
//         <p><span className="label">Status:</span> {application.status}</p>
//         <p><span className="label">Applied On:</span> {new Date(application.appliedAt).toLocaleString()}</p>
//         <p><span className="label">Motivation Statement:</span> {application.statement}</p>
//         <p><span className="label">Uploaded File:</span> {application.fileName}</p>
//       </div>
//     </div>
//   );
// };

// export default ApplicationStatus;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/ApplicationStatus.css';

// const ApplicationStatus = () => {
//   const { id } = useParams();
//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
//     const found = storedApps.find(app => app.id.toString() === id);
//     setApplication(found);
//   }, [id]);

//   if (!application) {
//     return <p className="not-found">Application not found.</p>;
//   }

//   return (
//     <div className="status-container" style={{ paddingTop: '200px' }}>
//       <h3 className="status-title">Application Status</h3>
//       <div className="status-detail">
//         <p><span className="label">Internship:</span> {application.title}</p>
//         <p><span className="label">Status:</span> {application.status}</p>
//         <p><span className="label">Applied On:</span> {new Date(application.appliedAt).toLocaleString()}</p>
//         <p><span className="label">Motivation Statement:</span> {application.statement}</p>
//         <p><span className="label">Uploaded Files:</span></p>
//         {/* <ul>
//           {application.files && application.files.length > 0 ? (
//             application.files.map((fileName, index) => (
//               <li key={index}>{fileName}</li>
//             ))
//           ) : (
//             <li>No files uploaded.</li>
//           )}
//         </ul> */}
//         <ul>
//   {application.files && application.files.length > 0 ? (
//     application.files.map((fileName, index) => (
//       <li key={index} title={fileName}>{fileName}</li> // show full name on hover tooltip
//     ))
//   ) : (
//     <li>No files uploaded.</li>
//   )}
// </ul>

//       </div>
//     </div>
//   );
// };

// export default ApplicationStatus;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ApplicationStatus.css';

const statusDescriptions = {
  pending: "Not yet seen",
  finalized: "One of the top applicants, decision pending",
  accepted: "Your application has been accepted",
  rejected: "Your application has been rejected",
};

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

  const status = application.status.toLowerCase();
  const description = statusDescriptions[status] || "Status unknown";

  return (
    <div className="status-container" style={{ paddingTop: '200px' }}>
      <h3 className="status-title">Application Status</h3>
      <div className="status-detail">
        <p><span className="label">Internship:</span> {application.title}</p>
        <p>
          <span className="label">Status:</span> 
          <strong style={{ textTransform: 'capitalize' }}>{status}</strong> — {description}
        </p>
        <p><span className="label">Applied On:</span> {new Date(application.appliedAt).toLocaleString()}</p>
        <p><span className="label">Motivation Statement:</span> {application.statement}</p>
        <p><span className="label">Uploaded Files:</span></p>
        <ul>
          {application.files && application.files.length > 0 ? (
            application.files.map((fileName, index) => (
              <li key={index} title={fileName}>{fileName}</li>
            ))
          ) : (
            <li>No files uploaded.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationStatus;
