import React, { useState } from 'react';

// Notification Component (for FR 59)
const Notification = ({ message }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: 'lightgreen', marginTop: '20px' }}>
      <strong>Notification:</strong> {message}
    </div>
  );
};

// Appeal Form (for FR 61)
const AppealReport = ({ reportId }) => {
  const [appealText, setAppealText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting appeal for report ${reportId}:`, appealText);
    setMessage('Your appeal has been submitted successfully.');
  };

  return (
    <div>
      <h2>Appeal Your Report</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Explain why you believe your report should be reconsidered..."
          value={appealText}
          onChange={(e) => setAppealText(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit Appeal</button>
      </form>

      {message && <div style={{ padding: '10px', backgroundColor: 'lightblue', marginTop: '20px' }}>{message}</div>}
    </div>
  );
};

// Internship Report Component
const InternshipReport = ({ internship, reportStatus }) => {
  const [report, setReport] = useState({ title: '', body: '', intro: '' });
  const [notification, setNotification] = useState('');
  const [status, setStatus] = useState(reportStatus);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Internship Report Submitted');
    setNotification('Your internship report has been successfully submitted.');
    setStatus('Under Review'); // Example status change (can be more dynamic)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Internship Report for {internship.title}</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={report.title}
          onChange={handleChange}
        />
        <textarea
          name="intro"
          placeholder="Introduction"
          value={report.intro}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Report Body"
          value={report.body}
          onChange={handleChange}
        />
        <button type="submit">Submit Report</button>
      </form>

      {notification && <Notification message={notification} />}

      {status === 'Rejected' && <AppealReport reportId={internship.id} />}
    </div>
  );
};

export default InternshipReport;
