import React from 'react';
import { Link } from 'react-router-dom';
import companies from '../data/companies';
import '../css/SuggestedCompanies.css'; // 👈 Import the new CSS

const SuggestedCompanies = () => (
  <div className="dashboard-section" style={{ paddingTop: '200px' }}>
    <h3 className="section-title">Suggested Companies</h3>
    <ul className="company-list">
      {companies.map((c) => (
        <li key={c.id} className="company-item">
          <Link to={`/companies/${c.id}`} className="company-link">
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SuggestedCompanies;
