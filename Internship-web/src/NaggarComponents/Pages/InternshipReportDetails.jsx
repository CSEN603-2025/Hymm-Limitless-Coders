import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReports } from '../Context/ReportContext';
import '../Styles/report.css';

function InternshipReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports, evaluations, updateReportStatus } = useReports();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const report = reports.find(r => r.id === parseInt(id));
  const evaluation = evaluations[id];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (report?.comments) {
      setComments(report.comments);
    }
  }, [report]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!report) return <p className="error-text">Report not found.</p>;

  const isCommentSectionVisible = report?.status === 'Flagged' || report?.status === 'Rejected';

  const handleUpdateComment = (commentId) => {
    const commentToEdit = comments.find(c => c.id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.text);
      setEditingCommentId(commentId);
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
    updateReportStatus(id, report.status, null, commentId);
  };

  const handleEditSubmit = () => {
    if (comment.trim() && editingCommentId) {
      const updatedComments = comments.map(c =>
        c.id === editingCommentId ? { ...c, text: comment.trim() } : c
      );
      setComments(updatedComments);
      updateReportStatus(id, report.status, { id: editingCommentId, text: comment.trim() });
      setComment('');
      setEditingCommentId(null);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment.trim(),
        status: report.status,
        timestamp: new Date().toISOString()
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      updateReportStatus(id, report.status, newComment);
      setComment('');
    }
  };

  const handleBack = () => {
    navigate('/SCAD/internship-reports');
  };

  const downloadReport = () => {
    const reportContent = `
      Internship Report
      Student: ${report.studentName || 'N/A'}
      Content: ${report.content || 'N/A'}
      Status: ${report.status || 'Unknown'}
    `;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadEvaluation = () => {
    if (!evaluation) return;
    const evaluationContent = `
      Evaluation Report
      Student: ${evaluation.studentName || 'N/A'}
      Company: ${evaluation.companyName || 'N/A'}
      Supervisor: ${evaluation.supervisor || 'N/A'}
      Start Date: ${evaluation.startDate || 'N/A'}
      End Date: ${evaluation.endDate || 'N/A'}
    `;
    const blob = new Blob([evaluationContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation_${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container">
      <main className="content-area">
        <header className="page-header">
          <button className="btn-back" onClick={handleBack}>
            <span className="back-icon">←</span> Back to Reports
          </button>
          <h1 className="page-title">Internship Report Details</h1>
        </header>

        <div className="details-container">
          <section className="report-section" aria-labelledby="report-heading">
            <h2 id="report-heading" className="section-title">Report Information</h2>
            <div className="card report-card">
              <div className="report-header">
                <h3>{report.studentName || 'N/A'}</h3>
                <span className={`status-badge status-${report.status?.toLowerCase() || 'unknown'}`}>
                  {report.status || 'Unknown'}
                </span>
              </div>
              <div className="report-body">
                <div className="info-row">
                  <span className="info-label">Content:</span>
                  <span className="info-value">{report.content || 'N/A'}</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-download" onClick={downloadReport}>
                  <span className="download-icon">↓</span> Download Report
                </button>
              </div>

              {isCommentSectionVisible && comments.length > 0 && (
                <div className="comments-section">
                  <h3 className="comments-title">Comment History</h3>
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment-card">
                        <div className="comment-header">
                          <span className={`comment-status status-${comment.status.toLowerCase()}`}>
                            {comment.status}
                          </span>
                          <span className="comment-date">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                          <button className="btn-edit" onClick={() => handleUpdateComment(comment.id)}>
                            Edit
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isCommentSectionVisible && (
                <div className="comment-input-section">
                  <h4 className="comment-input-title">
                    {editingCommentId ? 'Edit Comment' : 'Add Comment'}
                    <span className="required-note">* Required for {report.status} status</span>
                  </h4>
                  <textarea
                    className="comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={editingCommentId ? "Edit your comment..." : "Add a comment..."}
                    rows="4"
                  />
                  <div className="comment-actions">
                    <button
                      className="btn-primary"
                      onClick={editingCommentId ? handleEditSubmit : handleAddComment}
                      disabled={!comment.trim()}
                    >
                      {editingCommentId ? 'Update Comment' : 'Add Comment'}
                    </button>
                    {(comment || editingCommentId) && (
                      <button
                        className="btn-outline"
                        onClick={() => {
                          setComment('');
                          setEditingCommentId(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="evaluation-section" aria-labelledby="evaluation-heading">
            <h2 id="evaluation-heading" className="section-title">Evaluation Report</h2>
            <div className="card evaluation-card">
              {evaluation ? (
                <>
                  <div className="evaluation-header">
                    <h3>{evaluation.studentName || 'N/A'}</h3>
                  </div>
                  <div className="evaluation-body">
                    <div className="info-row">
                      <span className="info-label">Company:</span>
                      <span className="info-value">{evaluation.companyName || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Supervisor:</span>
                      <span className="info-value">{evaluation.supervisor || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Start Date:</span>
                      <span className="info-value">{evaluation.startDate || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">End Date:</span>
                      <span className="info-value">{evaluation.endDate || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="btn-download" onClick={downloadEvaluation}>
                      <span className="download-icon">↓</span> Download Evaluation
                    </button>
                  </div>
                </>
              ) : (
                <p className="error-text">No evaluation report found.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default InternshipReportDetails;