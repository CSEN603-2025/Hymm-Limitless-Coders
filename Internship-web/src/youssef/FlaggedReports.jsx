import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlaggedReports.css';
// import './dashboard.css'; // Include your shared styles if not globally applied

export default function FlaggedReports() {
  const navigate = useNavigate();

  const dummyReports = [
    {
      id: '1',
      title: 'Late Submission',
      reason: 'Submitted after deadline',
      status: 'flagged',
      description: 'The report was submitted two days after the official deadline.'
    },
    {
      id: '2',
      title: 'Incomplete Report',
      reason: 'Missing supervisor signature',
      status: 'rejected',
      description: 'The report was missing the required supervisor sign-off.'
    }
  ];

  const [comments, setComments] = useState({});

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('reportComments')) || {};
    setComments(savedComments);
  }, []);

  const handleAddComment = (reportId, commentText) => {
    if (!commentText.trim()) return;
    const updated = {
      ...comments,
      [reportId]: [...(comments[reportId] || []), commentText]
    };
    setComments(updated);
    localStorage.setItem('reportComments', JSON.stringify(updated));
  };

  return (
    <div className="dashboard-container">
      <div className="pro-badge">PRO Badge - Active After 3 Months</div>

      <h2 className="dashboard-title">📄 Flagged / Rejected Reports</h2>

      {dummyReports.map(report => (
        <div key={report.id} className="card dashboard-section">
          <h3 className="card-header">
            {report.title} <span className="report-status">({report.status})</span>
          </h3>
          <p><strong>Reason:</strong> {report.reason}</p>
          <p>{report.description}</p>

          <div className="comments-section">
            <h4 className="comments-title">📝 Comments</h4>
            <ul className="comments-list">
              {(comments[report.id] || []).map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
            <AddComment onAdd={(text) => handleAddComment(report.id, text)} />
          </div>
        </div>
      ))}

      <div className="back-btn-wrapper">
        <button className="btn-secondary" onClick={() => navigate('/prostudentextras')}>
          ← Back
        </button>
      </div>
    </div>
  );
}

function AddComment({ onAdd }) {
  const [text, setText] = useState('');

  return (
    <div className="add-comment">
      <input
        type="text"
        value={text}
        placeholder="Add a comment..."
        onChange={e => setText(e.target.value)}
        className="input"
      />
      <button
        className="btn-primary"
        onClick={() => {
          onAdd(text);
          setText('');
        }}
      >
        Add
      </button>
    </div>
  );
}
