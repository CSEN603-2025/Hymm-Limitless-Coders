import React from 'react';
//(FR 39)
const PastInternships = ({ internships }) => {
  return (
    <div>
      <h3>Past and Present Internships</h3>
      <ul>
        {internships.map((internship) => (
          <li key={internship.id}>
            {internship.title} - Status: {internship.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastInternships;
