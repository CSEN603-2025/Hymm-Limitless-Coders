// src/pages/SuggestedCompanies.jsx
import React, { useEffect, useState } from 'react';

const SuggestedCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Simulated API response
    const fetchSuggestedCompanies = async () => {
      const fakeData = [
        { id: 1, name: 'Google', industry: 'Tech' },
        { id: 2, name: 'Pfizer', industry: 'Pharma' },
        { id: 3, name: 'Tesla', industry: 'Automotive' },
      ];
      setCompanies(fakeData);
    };

    fetchSuggestedCompanies();
  }, []);

  return (
    <div>
      <h2>Suggested Companies</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name} – {company.industry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedCompanies;
