// src/pages/MajorsList.jsx
import React from 'react';

const majors = [
  'Computer Science',
  'Electrical Engineering',
  'Business Administration',
  'Biotechnology',
];

const MajorsList = () => {
  return (
    <div>
      <h2>Available Majors</h2>
      <ul>
        {majors.map((major, index) => (
          <li key={index}>{major}</li>
        ))}
      </ul>
    </div>
  );
};

export default MajorsList;
