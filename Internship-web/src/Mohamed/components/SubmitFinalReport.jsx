// import React, { useState, useEffect } from 'react';
// import '../css/SubmitFinalReport.css'; // 👈 Add this CSS file

// const SubmitFinalReport = () => {
//   const [reportFile, setReportFile] = useState(null);
//   const [reportStatus, setReportStatus] = useState(null);
//   const [appealMessage, setAppealMessage] = useState('');
//   const [appealSubmitted, setAppealSubmitted] = useState(false);

//   useEffect(() => {
//     const savedStatus = localStorage.getItem('reportStatus');
//     if (savedStatus) {
//       setReportStatus(savedStatus);
//     }
//   }, []);


//   useEffect(() => {
//     if (reportStatus === 'Pending') {
//       const timer = setTimeout(() => {
//         localStorage.setItem('reportStatus', 'Rejected');
//         setReportStatus('Rejected');
//       }, 3000); // 4 seconds
  
//       return () => clearTimeout(timer); // cleanup in case component unmounts
//     }
//   }, [reportStatus]);
  

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     if (!reportFile) {
//       alert('Please upload your report file before submitting.');
//       return;
//     }

//     const initialStatus = 'Pending';
//     localStorage.setItem('reportStatus', initialStatus);
//     setReportStatus(initialStatus);
//     alert('Final report submitted successfully and is now pending review.');
//   };

//   const handleAppealSubmit = (e) => {
//     e.preventDefault();
//     if (!appealMessage.trim()) {
//       alert('Please enter your appeal message.');
//       return;
//     }

//     setAppealSubmitted(true);
//     alert('Your appeal has been submitted successfully.');
//     localStorage.setItem('reportStatus', 'Pending');
//     setReportStatus("Pending");
//   };

//   return (
//     <div className="report-container" style={{ paddingTop: '200px' }}>
//       <h2 className="report-title">Final Internship Report Submission</h2>

//       {!reportStatus && (
//         <form className="report-form" onSubmit={handleReportSubmit}>
//           <label htmlFor="reportFile">Upload Final Report (PDF/DOC):</label>
//           <input
//             type="file"
//             id="reportFile"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setReportFile(e.target.files[0])}
//           />
//           <button type="submit" className="submit-btn">Submit Report</button>
//         </form>
//       )}

//       {reportStatus && (
//         <div className="status-section">
//           <h4>
//             Report Status:{' '}
//             <span
//               className={`status-text ${
//                 reportStatus === 'Accepted'
//                   ? 'accepted'
//                   : reportStatus === 'Pending'
//                   ? 'pending'
//                   : 'rejected'
//               }`}
//             >
//               {reportStatus}
//             </span>
//           </h4>
//         </div>
//       )}

//       {(reportStatus === 'Rejected' || reportStatus === 'Flagged') && (
//         <div className="appeal-section">
//           <h4>Appeal Rejected/Flagged Report</h4>
//           <form onSubmit={handleAppealSubmit}>
//             <textarea
//               rows="4"
//               placeholder="Write your appeal here..."
//               value={appealMessage}
//               onChange={(e) => setAppealMessage(e.target.value)}
//             />
//             <button type="submit" className="submit-btn">Submit Appeal</button>
//           </form>
//           {appealSubmitted && (
//             <p className="appeal-msg">Appeal submitted. Please wait for admin response.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubmitFinalReport;




import React, { useState, useEffect } from 'react';
import '../css/SubmitFinalReport.css';

const SubmitFinalReport = () => {
  const [reportFile, setReportFile] = useState(null);
  const [reportStatus, setReportStatus] = useState(null);
  const [appealMessage, setAppealMessage] = useState('');
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const savedStatus = localStorage.getItem('reportStatus');
    if (savedStatus) {
      setReportStatus(savedStatus);
    }
  }, []);

  // Show notification on any status change
  useEffect(() => {
    if (reportStatus) {
      const message = `Report status : ${reportStatus}`;
      setNotification(message);

      const timer = setTimeout(() => {
        setNotification('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [reportStatus]);

  // Simulate status change from Pending to Rejected
  useEffect(() => {
    if (reportStatus === 'Pending') {
      const timer = setTimeout(() => {
        const newStatus = 'Rejected';
        localStorage.setItem('reportStatus', newStatus);
        setReportStatus(newStatus);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [reportStatus]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportFile) {
      alert('Please upload your report file before submitting.');
      return;
    }

    const initialStatus = 'Pending';
    localStorage.setItem('reportStatus', initialStatus);
    setReportStatus(initialStatus);
    alert('Final report submitted successfully and is now pending review.');
  };

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    if (!appealMessage.trim()) {
      alert('Please enter your appeal message.');
      return;
    }

    setAppealSubmitted(true);
    alert('Your appeal has been submitted successfully.');
    localStorage.setItem('reportStatus', 'Pending');
    setReportStatus('Pending');
    setAppealMessage('');
  };

  return (
    <div className="report-container" style={{ paddingTop: '200px' }}>
      {/* {notification && <div className="custom-notification">{notification}</div>} */}
      {notification && (
  <div className={`custom-notification ${reportStatus?.toLowerCase()}`}>
    {notification}
  </div>
)}


      <h2 className="report-title">Final Internship Report Submission</h2>

      {!reportStatus && (
        <form className="report-form" onSubmit={handleReportSubmit}>
          <label htmlFor="reportFile">Upload Final Report (PDF/DOC):</label>
          <input
            type="file"
            id="reportFile"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setReportFile(e.target.files[0])}
          />
          <button type="submit" className="submit-btn">Submit Report</button>
        </form>
      )}

      {reportStatus && (
        <div className="status-section">
          <h4>
            Report Status:{' '}
            <span
              className={`status-text ${
                reportStatus === 'Accepted'
                  ? 'accepted'
                  : reportStatus === 'Pending'
                  ? 'pending'
                  : 'rejected'
              }`}
            >
              {reportStatus}
            </span>
          </h4>
        </div>
      )}

      {(reportStatus === 'Rejected' || reportStatus === 'Flagged') && (
        <div className="appeal-section">
          <h4>Appeal Rejected/Flagged Report</h4>
          <form onSubmit={handleAppealSubmit}>
            <textarea
              rows="4"
              placeholder="Write your appeal here..."
              value={appealMessage}
              onChange={(e) => setAppealMessage(e.target.value)}
            />
            <button type="submit" className="submit-btn">Submit Appeal</button>
          </form>
          {appealSubmitted && (
            <p className="appeal-msg">Appeal submitted. Please wait for admin response.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitFinalReport;
