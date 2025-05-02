import React from 'react';
//(FR 42)

const CompletedInternship = ({ internship }) => {
  return (
    <div>
      <h3>Completed Internship</h3>
      <p>{internship.title}</p>
      <p>{internship.description}</p>
      <p>Status: {internship.status}</p>
    </div>
  );
};

export default CompletedInternship;
