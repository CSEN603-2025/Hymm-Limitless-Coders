import React from 'react';
import { useLocation } from 'react-router-dom';

function StudentProfile() {
  const location = useLocation();
  const student = location.state?.student;

  if (!student) {
    return <p>No student data available.</p>;
  }

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Email: {student.email}</p>
      <p>Major: {student.major}</p>
      <p>Status: {student.status}</p>
    </div>
  );
}

export default StudentProfile;