import React, { useState, useEffect } from 'react';

// (FR 47, 59, 61)

const SubmitFinalReport = () => {
  const [reportFile, setReportFile] = useState(null);
  const [reportStatus, setReportStatus] = useState(null); // null by default
  const [appealMessage, setAppealMessage] = useState('');
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  // Load saved status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('reportStatus');
    if (savedStatus) {
      setReportStatus(savedStatus);
    }
  }, []);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportFile) {
      alert('Please upload your report file before submitting.');
      return;
    }

    // Simulate setting initial status as "Pending"
    const initialStatus = 'Pending';
    localStorage.setItem('reportStatus', initialStatus);
    setReportStatus(initialStatus);

    alert('Final report submitted successfully and is now pending review.'); // (FR 47)
  };

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    if (!appealMessage.trim()) {
      alert('Please enter your appeal message.');
      return;
    }

    // Simulate sending appeal
    setAppealSubmitted(true);
    alert('Your appeal has been submitted successfully.'); // (FR 61)
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Final Internship Report Submission</h2>

      {!reportStatus && (
  <form onSubmit={handleReportSubmit}>
    <label htmlFor="reportFile">Upload Final Report (PDF/DOC):</label>
    <input
      type="file"
      id="reportFile"
      accept=".pdf,.doc,.docx"
      onChange={(e) => setReportFile(e.target.files[0])}
    />
    <br />
    <button type="submit" style={{ marginTop: '10px' }}>
      Submit Report
    </button>
  </form>
)}


      {reportStatus && (
        <div style={{ marginTop: '20px' }}>
          <h4>
            Report Status:{' '}
            <span
              style={{
                color:
                  reportStatus === 'Accepted'
                    ? 'green'
                    : reportStatus === 'Pending'
                    ? 'orange'
                    : 'red',
              }}
            >
              {reportStatus}
            </span>
          </h4>
        </div>
      )}

      {(reportStatus === 'Rejected' || reportStatus === 'Flagged') && (
        <div style={{ marginTop: '20px' }}>
          <h4>Appeal Rejected/Flagged Report</h4>
          <form onSubmit={handleAppealSubmit}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Write your appeal here..."
              value={appealMessage}
              onChange={(e) => setAppealMessage(e.target.value)}
            />
            <br />
            <button type="submit">Submit Appeal</button>
          </form>
          {appealSubmitted && (
            <p style={{ color: 'blue' }}>
              Appeal submitted. Please wait for admin response.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitFinalReport;
