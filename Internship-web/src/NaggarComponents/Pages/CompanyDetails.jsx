import React from 'react';
import { useLocation } from 'react-router-dom';
// Import the separate CSS file for company details
import '../Styles/company-details.css';

function CompanyDetails({ onDecision = () => {} }) {
  const { state } = useLocation();
  const company = state?.company;

  if (!company) {
    return <div className="error-message">Error: No company data provided.</div>;
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <h2 className="details-title">{company.name}</h2>
        
        <div className="details-content">
          <div className="details-field">
            <span className="field-label">Industry:</span>
            <span className="field-value">{company.industry}</span>
          </div>
          
          <div className="details-field">
            <span className="field-label">Status:</span>
            <span className="field-value">
              <span className={`status-badge status-${company.status.toLowerCase()}`}>
                {company.status}
              </span>
            </span>
          </div>
        </div>
        
        <div className="details-actions">
          <button 
            className="btn-primary" 
            onClick={() => onDecision('Accepted')}
            aria-label="Accept company"
          >
            Accept
          </button>
          <button 
            className="btn-outline btn-danger" 
            onClick={() => onDecision('Rejected')}
            aria-label="Reject company"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;