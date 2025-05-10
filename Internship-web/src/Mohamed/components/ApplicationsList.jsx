// // components/ApplicationsList.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ApplicationsList = () => {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const storedApps = JSON.parse(localStorage.getItem('applications')) || [];
//     setApplications(storedApps);
//   }, []);

//   if (applications.length === 0) return <p>No applications submitted yet.</p>;

//   return (
//     <div>
//       <h3>Your Applications</h3>
//       <ul>
//         {applications.map((app) => (
//           <li key={app.id}>
//             <strong>{app.title}</strong> - Status: {app.status}
//             {' '}| <Link to={`/applications/${app.id}`}>View Status</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ApplicationsList;










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
    return <p className="no-apps">No applications submitted yet.</p>;
  }

  return (
    <div className="applications-container">
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







