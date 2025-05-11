import React from 'react';

function StudentCard({ student, onClick }) {
  return (
    <div className="card report-card" onClick={onClick}>
      <div className="card-content">
        <h3 className="report-name">{student.name}</h3>
        <div className="report-details">
          <div className="report-info">
            <span className="info-label">Major:</span>
            {student.major}
          </div>
          <div className="report-info">
            <span className="info-label">Email:</span>
            {student.email}
          </div>
          <div className="report-info">
            <span className="info-label">GPA:</span>
            {student.gpa}
          </div>
          <div className="report-info">
            <span className="info-label">Status:</span>
            <span className={`status-badge status-${student.status.toLowerCase().replace(' ', '-')}`}>
              {student.status}
            </span>
          </div>
          <div className="report-info">
            <span className="info-label">Semester:</span>
            {student.semester}
          </div>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn-primary">View Details</button>
      </div>
    </div>
  );
}

export default StudentCard; 