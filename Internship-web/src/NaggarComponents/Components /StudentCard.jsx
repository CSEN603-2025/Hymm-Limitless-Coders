import React from 'react';

function StudentCard({ student, onViewProfile }) {
  return (
    <div>
      <h3>{student.name}</h3>
      <p>Status: {student.status}</p>
      <button onClick={onViewProfile}>View Profile</button>
    </div>
  );
}

export default StudentCard;