import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReports } from '../Context/ReportContext';
import NaggarRoutes from '../NaggarRoutes';
import './report.css';

function InternshipReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports, evaluations, updateReportStatus } = useReports();
  const [loading, setLoading] = useState(true);
  const report = reports.find(r => r.id === parseInt(id));
  const evaluation = evaluations[id];

  // Mock loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="loading-spinner" role="status" aria-live="polite">Loading...</div>;
  }

  if (!report) {
    return <p className="error-text" role="alert">Report not found.</p>;
  }

  const handleChangeStatus = (newStatus) => {
    updateReportStatus(id, newStatus);
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
          <h1 className="section-header">Internship Report Details</h1>
          <button
            className="btn-outline btn-back"
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