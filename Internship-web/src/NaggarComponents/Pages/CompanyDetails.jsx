import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyDetails from '../Components /CompanyDetails';

const dummyCompanies = [
  { id: 1, name: 'Alpha Tech', industry: 'Technology', status: 'Pending' },
  { id: 2, name: 'Beta Health', industry: 'Healthcare', status: 'Pending' },
  { id: 3, name: 'Gamma Finance', industry: 'Finance', status: 'Pending' },
];

function CompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = dummyCompanies.find(c => c.id === parseInt(id));
  const [status, setStatus] = useState(company?.status || 'Pending');

  const handleDecision = (newStatus) => {
    setStatus(newStatus);
    // Logic to update backend can be added here
    navigate('/dashboard'); // After decision
  };

  if (!company) return <p>Company not found</p>;

  return (
    <div>
      <CompanyDetails company={{ ...company, status }} onDecision={handleDecision} />
    </div>
  );
}

export default CompanyPage;