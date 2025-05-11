import React from 'react';

function StudentCard({ student, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-header">
        <h3 className="card-title">{student.name}</h3>
      </div>
      <div className="card-content">
        <div className="card-info">
          <p><strong>Major:</strong> {student.major}</p>
          <p><strong>Status:</strong> <span className={`status-badge status-${student.status.toLowerCase().replace(' ', '-')}`}>{student.status}</span></p>
          <p><strong>GPA:</strong> {student.gpa}</p>
          <p><strong>Semester:</strong> {student.semester}</p>
          <p><strong>Internship Type:</strong> {student.internshipType}</p>
        </div>
        <div className="card-actions">
          <button className="btn-primary">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;