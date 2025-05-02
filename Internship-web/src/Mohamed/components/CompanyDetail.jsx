// components/CompanyDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import companies from '../data/companies';

const CompanyDetail = () => {
  const { id } = useParams();
  const company = companies.find(c => c.id === parseInt(id));

  if (!company) {
    return <div>Company not found.</div>;
  }

  return (
    <div>
      <h2>{company.name}</h2>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Founded:</strong> {company.founded}</p>
      <p><strong>Employees:</strong> {company.employees}</p>
      <p>
        <strong>Website:</strong>{' '}
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          {company.website}
        </a>
      </p>
    </div>
  );
};

export default CompanyDetail;
