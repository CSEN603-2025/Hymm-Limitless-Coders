import React from 'react';

function CompanyDetails({ company, onDecision }) {
  return (
    <div>
      <h2>{company.name}</h2>
      <p>Industry: {company.industry}</p>
      <p>Status: {company.status}</p>

      <button onClick={() => onDecision('Accepted')}>Accept</button>
      <button onClick={() => onDecision('Rejected')}>Reject</button>
    </div>
  );
}

export default CompanyDetails;