import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReports } from '../Context/ReportContext';
import NaggarRoutes from '../NaggarRoutes';
import '../Styles/report.css';

// ...imports remain the same

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

  const handleBack = () => {
    navigate('/internship-reports');
  };

  return (
    <div className="page-container">
      <NaggarRoutes />
      <main className="content-area">
        <header className="page-header">
          <button className="btn-back" onClick={handleBack}>Back to Reports</button>
        </header>

        <section className="report-section" aria-labelledby="report-heading">
          <h2 id="report-heading">Report Information</h2>
          <div className="card">
            <p><strong>Student:</strong> {report.studentName || 'N/A'}</p>
            <p><strong>Content:</strong> {report.content || 'N/A'}</p>
            <p><strong>Status:</strong>
              <span className={`status-badge status-${report.status?.toLowerCase() || 'unknown'}`}>
                {report.status || 'Unknown'}
              </span>
            </p>

            {comments.length > 0 && (
              <div className="comments-section">
                <h3>Comments History</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <span>{comment.status}</span>
                      <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p>{comment.text}</p>
                    <div className="comment-actions">
                      <button onClick={() => handleUpdateComment(comment.id)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {editingCommentId && (
              <div className="comment-input-section">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Edit your comment..."
                  rows="4"
                />
                <div className="comment-actions">
                  <button
                    className="btn-primary"
                    onClick={handleEditSubmit}
                    disabled={!comment.trim()}
                  >
                    Update Comment
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => {
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

        <section className="evaluation-section" aria-labelledby="evaluation-heading">
          <h2 id="evaluation-heading">Evaluation Report</h2>
          <div className="card">
            {evaluation ? (
              <>
                <p><strong>Student:</strong> {evaluation.studentName || 'N/A'}</p>
                <p><strong>Company:</strong> {evaluation.companyName || 'N/A'}</p>
                <p><strong>Supervisor:</strong> {evaluation.supervisor || 'N/A'}</p>
                <p><strong>Start Date:</strong> {evaluation.startDate || 'N/A'}</p>
                <p><strong>End Date:</strong> {evaluation.endDate || 'N/A'}</p>
              </>
            ) : (
              <p className="error-text">No evaluation report found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default InternshipReportDetails;