import React from 'react';
import majors from '../data/majors';

const MajorsList = () => (
  <div>
    <h2>Majors</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {majors.map((m) => (
        <li key={m.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem', borderRadius: '8px' }}>
          <h3>{m.name}</h3>
          <p><strong>Department:</strong> {m.department}</p>
          <p><strong>Duration:</strong> {m.duration}</p>
          <p>{m.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default MajorsList;
