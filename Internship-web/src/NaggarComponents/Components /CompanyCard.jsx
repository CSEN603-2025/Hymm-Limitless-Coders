import React from 'react';
import { Link } from 'react-router-dom';
import '../Pages/companylist.css';

function CompanyCard({ company }) {
  return (
    <div className="card report-card">
      <div className="card-content">
        <h3 className="report-name">{company.name}</h3>
        <div className="report-details">
          <div className="report-info">
            <span className="info-label">Industry:</span>
            {company.industry}
          </div>
          <div className="report-info">
            <span className="info-label">Location:</span>
            {company.location}
          </div>
          <div className="report-info">
            <span className="info-label">Size:</span>
            {company.size}
          </div>
          <div className="report-info">
            <span className="info-label">Status:</span>
            <span className={`status-badge status-${company.status.toLowerCase()}`}>
              {company.status}
            </span>
          </div>
          <div className="report-info">
            <span className="info-label">Deadline:</span>
            {new Date(company.applicationDeadline).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="card-actions">
        <Link to={`/company/${company.id}`} className="btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default CompanyCard;