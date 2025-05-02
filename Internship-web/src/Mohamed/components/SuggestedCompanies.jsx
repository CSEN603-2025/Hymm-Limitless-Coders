// components/SuggestedCompanies.js (FR 11)
import React from 'react';
import { Link } from 'react-router-dom';
import companies from '../data/companies';

const SuggestedCompanies = () => (
  <div>
    <h2>Suggested Companies</h2>
    <ul>
      {companies.map((c) => (
        <li key={c.id}>
          <Link to={`/companies/${c.id}`}>{c.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SuggestedCompanies;
