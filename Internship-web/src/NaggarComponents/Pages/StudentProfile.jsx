import React from 'react';

function StudentProfile({ student }) {
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