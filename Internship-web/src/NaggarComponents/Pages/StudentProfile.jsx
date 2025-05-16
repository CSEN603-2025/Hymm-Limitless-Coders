import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/StudentProfile.css';

function StudentProfile() {
  const location = useLocation();
  const student = location.state?.student;

  if (!student) {
    return <p className="no-data">No student data available.</p>;
  }

  return (
    <div className="student-profile-container">
      <h2 className="student-name">{student.name}</h2>
      <p className="student-detail">Email: {student.email}</p>
      <p className="student-detail">Major: {student.major}</p>
      <p className="student-detail">Status: {student.status}</p>
    </div>
  );
}

export default StudentProfile;