import React from 'react';
import '../Styles/report.css'
function ReportCard({ report, onClick }) {
  // Added classes for consistent styling with card design pattern
  return (
    <div className="card report-card">
      <h3 className="card-header report-name">{report.studentName}</h3>
      <div className="card-content report-details">
        <p className="report-info"><span className="info-label">Major:</span> {report.major}</p>
        <p className="report-info">
          <span className="info-label">Status:</span> 
          <span className={`status-badge status-${report.status.toLowerCase()}`}>{report.status}</span>
        </p>
      </div>
      <div className="card-actions">
        <button className="btn-primary" onClick={onClick}>View Report</button>
      </div>
    </div>
  );
}

export default ReportCard;