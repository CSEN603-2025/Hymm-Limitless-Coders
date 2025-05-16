

// import React, { useState, useEffect } from 'react';
// import '../css/SubmitFinalReport.css';

// const SubmitFinalReport = () => {
//   const [reportFile, setReportFile] = useState(null);
//   const [previewURL, setPreviewURL] = useState(null);
//   const [reportStatus, setReportStatus] = useState(null);
//   const [appealMessage, setAppealMessage] = useState('');
//   const [appealSubmitted, setAppealSubmitted] = useState(false);
//   const [notification, setNotification] = useState('');

//   useEffect(() => {
//     const savedStatus = localStorage.getItem('reportStatus');
//     if (savedStatus) {
//       setReportStatus(savedStatus);
//     }
//   }, []);

//   useEffect(() => {
//     if (reportStatus) {
//       const message = `Report status: ${reportStatus}`;
//       setNotification(message);

//       const timer = setTimeout(() => {
//         setNotification('');
//       }, 4000);

//       return () => clearTimeout(timer);
//     }
//   }, [reportStatus]);

//   useEffect(() => {
//     if (reportStatus === 'Pending') {
//       const timer = setTimeout(() => {
//         const reviewCount = parseInt(localStorage.getItem('reportReviewCount') || '0', 10);
//         const newReviewCount = reviewCount + 1;
//         localStorage.setItem('reportReviewCount', newReviewCount);

//         const newStatus = newReviewCount === 1 ? 'Rejected' : 'Accepted';
//         localStorage.setItem('reportStatus', newStatus);
//         setReportStatus(newStatus);
//       }, 4000);

//       return () => clearTimeout(timer);
//     }
//   }, [reportStatus]);

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     if (!reportFile) {
//       alert('Please upload your report file before submitting.');
//       return;
//     }

//     localStorage.setItem('reportStatus', 'Pending');
//     setReportStatus('Pending');
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
//     setReportStatus('Pending');
//     setAppealMessage('');
//   };

//   return (
//     <div className="report-container" style={{ paddingTop: '200px' }}>
//       {notification && (
//         <div className={`custom-notification ${reportStatus?.toLowerCase()}`}>
//           {notification}
//         </div>
//       )}

//       <h2 className="report-title">Final Internship Report Submission</h2>

//       {!reportStatus && (
//         <form className="report-form" onSubmit={handleReportSubmit}>
//           <label htmlFor="reportFile">Upload Final Report (PDF/DOC):</label>
//           <input
//             type="file"
//             id="reportFile"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               setReportFile(file);
//               if (file) {
//                 const url = URL.createObjectURL(file);
//                 setPreviewURL(url);
//               }
//             }}
//           />

//           {previewURL && (
//             <a
//               href={previewURL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="view-file-btn"
//               style={{ marginTop: '10px', display: 'inline-block' }}
//             >
//               View Uploaded File
//             </a>
//           )}

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
  const [previewURL, setPreviewURL] = useState(null);
  const [reportStatus, setReportStatus] = useState(null);
  const [appealMessage, setAppealMessage] = useState('');
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const [notification, setNotification] = useState('');

  // On mount: load status, review count, and file info from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('reportStatus');
    if (savedStatus) {
      setReportStatus(savedStatus);
    }

    // Load saved file info from localStorage
    const savedFileName = localStorage.getItem('reportFileName');
    const savedFileData = localStorage.getItem('reportFileData');
    if (savedFileName && savedFileData) {
      // Create a Blob URL from base64 data
      const byteString = atob(savedFileData.split(',')[1]); // remove "data:*/*;base64,"
      const mimeString = savedFileData.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);

      setPreviewURL(url);
      setReportFile({ name: savedFileName, type: mimeString });
    }
  }, []);

  useEffect(() => {
    if (reportStatus) {
      const message = `Report status: ${reportStatus}`;
      setNotification(message);

      const timer = setTimeout(() => {
        setNotification('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [reportStatus]);

  useEffect(() => {
    if (reportStatus === 'Pending') {
      const timer = setTimeout(() => {
        const reviewCount = parseInt(localStorage.getItem('reportReviewCount') || '0', 10);
        const newReviewCount = reviewCount + 1;
        localStorage.setItem('reportReviewCount', newReviewCount);

        const newStatus = newReviewCount === 1 ? 'Rejected' : 'Accepted';
        localStorage.setItem('reportStatus', newStatus);
        setReportStatus(newStatus);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [reportStatus]);

  // Helper: convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportFile) {
      alert('Please upload your report file before submitting.');
      return;
    }

    // Save file info and data in localStorage for persistence
    try {
      const base64Data = await fileToBase64(reportFile);
      localStorage.setItem('reportFileName', reportFile.name);
      localStorage.setItem('reportFileData', base64Data);
    } catch (error) {
      alert('Error saving file data.');
      return;
    }

    localStorage.setItem('reportStatus', 'Pending');
    setReportStatus('Pending');
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

  // If the user uploads a new file, reset the saved file in localStorage immediately
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setReportFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);

      // Clear old saved file to avoid mismatch
      localStorage.removeItem('reportFileName');
      localStorage.removeItem('reportFileData');
    } else {
      setPreviewURL(null);
    }
  };

  return (
    <div className="report-container" style={{ paddingTop: '200px' }}>
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
            onChange={handleFileChange}
          />

          {previewURL && (
            <a
              href={previewURL}
              target="_blank"
              rel="noopener noreferrer"
              className="view-file-btn"
              style={{ marginTop: '10px', display: 'inline-block' }}
            >
              View Uploaded File
            </a>
          )}

          <button type="submit" className="submit-btn">Submit Report</button>
        </form>
      )}

      {reportStatus && (
        <>
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

          {/* Show View Uploaded File even after submission */}
          {previewURL && (
            <div style={{ marginTop: '10px' }}>
              <strong>Uploaded Report: </strong>
              <a
                href={previewURL}
                target="_blank"
                rel="noopener noreferrer"
                className="view-file-btn"
              >
                View Uploaded File
              </a>
            </div>
          )}
        </>
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
