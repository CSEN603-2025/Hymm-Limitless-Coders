import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCard from './CompanyCard';

const dummyCompanies = [
  { id: 1, name: 'Alpha Tech', industry: 'Technology', status: 'Pending' },
  { id: 2, name: 'Beta Health', industry: 'Healthcare', status: 'Pending' },
  { id: 3, name: 'Gamma Finance', industry: 'Finance', status: 'Pending' },
];

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const filteredCompanies = dummyCompanies.filter(company => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === '' || company.industry === filter)
    );
  });

  const handleViewDetails = (id) => {
    navigate(`/company/${id}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Industries</option>
        <option value="Technology">Technology</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Finance">Finance</option>
      </select>

      <div>
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onViewDetails={() => handleViewDetails(company.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;