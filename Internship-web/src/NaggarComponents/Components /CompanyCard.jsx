import React from 'react';

function CompanyCard({ company, onViewDetails }) {
  return (
    <div>
      <h3>{company.name}</h3>
      <p>Industry: {company.industry}</p>
      <button onClick={onViewDetails}>View Details</button>
    </div>
  );
}

export default CompanyCard;