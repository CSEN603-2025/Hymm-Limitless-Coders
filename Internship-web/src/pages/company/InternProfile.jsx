// src/pages/company/InternProfile.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockProfilesByCompany = {
  'company1@test.com': {
    '1': { name: 'Sara Ali', field: 'Tech', projects: 'React frontend work' },
    '2': { name: 'Omar Yehia', field: 'Pharma', projects: 'Lab analysis & research' },
    '3': { name: 'Lina Nasser', field: 'Business', projects: 'Market data analysis' },
  },
  'company2@test.com': {
    '4': { name: 'Hassan Ali', field: 'Data Analysis', projects: 'Data modeling & visualization' },
    '3': { name: 'Lina Nasser', field: 'Business',    projects: 'Market data analysis' },
  }
};

const InternProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Read logged-in company email from localStorage
  const stored = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(stored);

  // 2. Pick the right profiles map
  const companyProfiles = mockProfilesByCompany[email] || {};
  const intern = companyProfiles[id];

  if (!intern) {
    return (
      <main className="form-container" style={{ paddingTop: '200px' }}>
        <section className="card">
          <p className="error-text">Intern not found.</p>
          <button
            className="btn-outline"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Intern Profile
        </h2>
        <p><strong>Name:</strong> {intern.name}</p>
        <p><strong>Field:</strong> {intern.field}</p>
        <p><strong>Projects:</strong> {intern.projects}</p>
        <button
          className="btn-outline"
          onClick={() => navigate(-1)}
          aria-label="Go back to intern list"
        >
          ← Back
        </button>
      </section>
    </main>
  );
};

export default InternProfile;
