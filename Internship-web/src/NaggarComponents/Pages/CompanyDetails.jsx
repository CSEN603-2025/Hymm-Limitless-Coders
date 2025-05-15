// CompanyDetails.jsx
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { CompanyContext } from '../Context/CompanyContext';
import '../Styles/report.css';

function CompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies, updateCompanyStatus } = useContext(CompanyContext);
  const company = companies.find((c) => c.id === parseInt(id));

  const handleDecision = (newStatus) => {
    updateCompanyStatus(parseInt(id), newStatus);
    navigate('/SCAD');
  };

  const handleBack = () => {
    navigate('/SCAD/Dashboard');
  };

  if (!company) {
    return (
      <div className="page-container">
        
        <main className="content-area">
          <div className="empty-state">
            <p>Company not found</p>
            <button className="btn-secondary" onClick={handleBack}>
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Ensure internshipPositions is an array
  const internshipPositions = Array.isArray(company.internshipPositions) 
    ? company.internshipPositions 
    : [];

  return (
    <div className="page-container">
      
      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Company Details</h1>
          <button
            className="btn-outline"
            onClick={handleBack}
            aria-label="Back to dashboard"
          >
            Back to Dashboard
          </button>
        </section>

        <section className="report-section" role="region" aria-labelledby="company-heading">
          <h2 className="section-subheader" id="company-heading">Company Information</h2>
          <div className="card">
            <div className="card-content">
              <div className="report-details">
                <div className="report-info">
                  <span className="info-label">Company Name:</span>
                  {company.name}
                </div>
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
                  <span className="info-label">Website:</span>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </div>
                <div className="report-info">
                  <span className="info-label">Status:</span>
                  <span className={`status-badge status-${company.status.toLowerCase()}`}>
                    {company.status}
                  </span>
                </div>
                <div className="report-info">
                  <span className="info-label">Application Deadline:</span>
                  {new Date(company.applicationDeadline).toLocaleDateString()}
                </div>
              </div>

              <div className="report-info description">
                <span className="info-label">Description:</span>
                <p>{company.description}</p>
              </div>

              <div className="report-info">
                <span className="info-label">Internship Positions:</span>
                {internshipPositions.length > 0 ? (
                  <ul className="position-list">
                    {internshipPositions.map((position, index) => (
                      <li key={index} className="position-item">
                        <span className="position-title">{position.title}</span>
                        <span className="position-count">({position.count} positions)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-positions">No internship positions available</p>
                )}
              </div>
            </div>

            <div className="card-actions">
              <button
                className="btn-primary"
                onClick={() => handleDecision('Approved')}
                disabled={company.status === 'Approved'}
              >
                Approve
              </button>
              <button
                className="btn-outline"
                onClick={() => handleDecision('Rejected')}
                disabled={company.status === 'Rejected'}
              >
                Reject
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleDecision('Pending')}
                disabled={company.status === 'Pending'}
              >
                Set Pending
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CompanyPage;