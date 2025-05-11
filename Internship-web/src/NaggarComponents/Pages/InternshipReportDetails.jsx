import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReports } from '../Context/ReportContext';
import NaggarRoutes from '../NaggarRoutes';
import '../Styles/report.css';

function InternshipReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports, evaluations, updateReportStatus } = useReports();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [comments, setComments] = useState([]); // Array to store multiple comments
  const report = reports.find(r => r.id === parseInt(id));
  const evaluation = evaluations[id];

  // Mock loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Load existing comments (you'll need to implement this in your backend)
  useEffect(() => {
    if (report?.comments) {
      setComments(report.comments);
    }
  }, [report]);

  if (loading) {
    return <div className="loading-spinner" role="status" aria-live="polite">Loading...</div>;
  }

  if (!report) {
    return <p className="error-text" role="alert">Report not found.</p>;
  }

  const handleChangeStatus = (newStatus) => {
    if (newStatus === 'Rejected' || newStatus === 'Flagged') {
      setShowCommentInput(true);
    } else {
      updateReportStatus(id, newStatus);
      setShowCommentInput(false);
      setComment('');
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(), // Temporary ID generation
        text: comment.trim(),
        status: report.status,
        timestamp: new Date().toISOString(),
        facultyName: 'Faculty Member' // Replace with actual faculty member name
      };

      setComments([...comments, newComment]);
      updateReportStatus(id, report.status, newComment);
      setShowCommentInput(false);
      setComment('');
    }
  };

  const handleUpdateComment = (commentId) => {
    const commentToEdit = comments.find(c => c.id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.text);
      setEditingCommentId(commentId);
      setShowCommentInput(true);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
    // Update the backend to remove the comment
    updateReportStatus(id, report.status, null, commentId);
  };

  const handleEditSubmit = () => {
    if (comment.trim() && editingCommentId) {
      const updatedComments = comments.map(c => 
        c.id === editingCommentId ? { ...c, text: comment.trim() } : c
      );
      setComments(updatedComments);
      // Update the backend with the edited comment
      updateReportStatus(id, report.status, { id: editingCommentId, text: comment.trim() });
      setShowCommentInput(false);
      setComment('');
      setEditingCommentId(null);
    }
  };

  const handleBack = () => {
    navigate('/internship-reports');
  };

  return (
    <div className="page-container">
      {/* Navigation */}
      <NaggarRoutes />

      {/* Main Content */}
      <main className="content-area" role="main">
        {/* Header Section */}
        <header className="page-header">
          <button
            className="btn-back"
            onClick={handleBack}
            title="Return to internship reports list"
            aria-label="Go back to internship reports"
          >
            Back to Reports
          </button>
        </header>

        {/* Report Section */}
        <section className="report-section" role="region" aria-labelledby="report-heading">
          <h2 className="section-subheader" id="report-heading">Report Information</h2>
          <div className="card">
            <p className="report-detail">
              <strong className="report-label">Student:</strong> {report.studentName || 'N/A'}
            </p>
            <p className="report-detail">
              <strong className="report-label">Content:</strong> {report.content || 'N/A'}
            </p>
            <p className="report-detail">
              <strong className="report-label">Status:</strong>
              <span className={`status-badge status-${report.status?.toLowerCase() || 'unknown'}`}>
                {report.status || 'Unknown'}
              </span>
            </p>

            {/* Comments Section */}
            {comments.length > 0 && (
              <div className="comments-section">
                <h3 className="comments-heading">Comments History</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <span className="comment-status">{comment.status}</span>
                      <span className="comment-date">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                      <button
                        className="btn-text"
                        onClick={() => handleUpdateComment(comment.id)}
                        title="Edit comment"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-text btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="Delete comment"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="button-group">
              <button
                className="btn-primary"
                onClick={() => handleChangeStatus('Accepted')}
                title="Accept this report"
                aria-label="Accept report"
              >
                Accept
              </button>
              <button
                className="btn-outline"
                onClick={() => handleChangeStatus('Rejected')}
                title="Reject this report"
                aria-label="Reject report"
              >
                Reject
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleChangeStatus('Flagged')}
                title="Flag this report for review"
                aria-label="Flag report"
              >
                Flag
              </button>
            </div>

            {showCommentInput && (
              <div className="comment-input-section">
                <textarea
                  className="comment-input"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={editingCommentId ? 
                    "Edit your comment..." : 
                    `Please provide a reason for ${report.status === 'Rejected' ? 'rejecting' : 'flagging'} this report...`}
                  rows="4"
                />
                <div className="comment-actions">
                  <button
                    className="btn-primary"
                    onClick={editingCommentId ? handleEditSubmit : handleSubmitComment}
                    disabled={!comment.trim()}
                  >
                    {editingCommentId ? 'Update Comment' : 'Submit Comment'}
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setShowCommentInput(false);
                      setComment('');
                      setEditingCommentId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Evaluation Section */}
        <section className="evaluation-section" role="region" aria-labelledby="evaluation-heading">
          <h2 className="section-subheader" id="evaluation-heading">Evaluation Report</h2>
          <div className="card">
            {evaluation ? (
              <div className="evaluation-details">
                <p className="report-detail">
                  <strong className="report-label">Student:</strong> {evaluation.studentName || 'N/A'}
                </p>
                <p className="report-detail">
                  <strong className="report-label">Company:</strong> {evaluation.companyName || 'N/A'}
                </p>
                <p className="report-detail">
                  <strong className="report-label">Supervisor:</strong> {evaluation.supervisor || 'N/A'}
                </p>
                <p className="report-detail">
                  <strong className="report-label">Start Date:</strong> {evaluation.startDate || 'N/A'}
                </p>
                <p className="report-detail">
                  <strong className="report-label">End Date:</strong> {evaluation.endDate || 'N/A'}
                </p>
              </div>
            ) : (
              <p className="error-text" role="alert">No evaluation report found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default InternshipReportDetails;