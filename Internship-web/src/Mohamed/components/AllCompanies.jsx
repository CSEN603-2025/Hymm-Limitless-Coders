import React from 'react';
import { Link } from 'react-router-dom';
import companies from '../data/companies';
import '../css/SuggestedCompanies.css';

const AllCompanies = () => {
  const role = localStorage.getItem('role');

  // Get all companies based on role
  const selectedCompanies = role === 'prostudent' ? companies.pro : companies.regular;

  return (
    <div className="dashboard-section" style={{ paddingTop: '200px' }}>
      <h3 className="section-title">All Internships</h3>

      <ul className="company-list">
        {selectedCompanies.length > 0 ? (
          selectedCompanies.map((c) => (
            <li key={c.id} className="company-item">
              <Link to={`/companies/${c.id}`} className="company-link">
                {c.name}
              </Link>
              {c.recommendedFromPastInterns && (
                <span className="recommended-badge">Recommended From Past interns</span>
              )}
            </li>
          ))
        ) : (
          <li className="no-results">No internships available at the moment.</li>
        )}
      </ul>
    </div>
  );
};

export default AllCompanies;
