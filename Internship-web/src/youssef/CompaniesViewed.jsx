import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompaniesViewed.css';

const CompaniesViewed = () => {
  const navigate = useNavigate();

  const companies = [
    {
      id: 1,
      name: 'Tech Innovators Inc.',
      description: 'A leading company in the tech industry specializing in AI and machine learning solutions.',
      viewDate: '2025-05-05',
    },
    {
      id: 2,
      name: 'Green Energy Corp.',
      description: 'A renewable energy company focused on sustainable and eco-friendly solutions.',
      viewDate: '2025-05-03',
    },
    {
      id: 3,
      name: 'HealthFirst Medical',
      description: 'A healthcare provider offering a wide range of services including primary care and specialized treatments.',
      viewDate: '2025-05-02',
    },
    {
      id: 4,
      name: 'Creative Designs Studio',
      description: 'A design agency focused on web and graphic design for startups and small businesses.',
      viewDate: '2025-04-28',
    },
    {
      id: 5,
      name: 'FinTech Solutions',
      description: 'A fintech company revolutionizing financial services with blockchain technology and innovative banking solutions.',
      viewDate: '2025-04-25',
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Companies that Viewed Your Profile</h2>

      <div className="dashboard-section card">
        <ul className="companies-list">
          {companies.map((company) => (
            <li key={company.id} className="company-item">
              <h3 className="card-header">{company.name}</h3>
              <p className="description-text">{company.description}</p>
              <span className="view-date">Viewed on: {company.viewDate}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="link-group">
        <button
          onClick={() => navigate('/prostudentextras')}
          className="btn-outline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default CompaniesViewed;