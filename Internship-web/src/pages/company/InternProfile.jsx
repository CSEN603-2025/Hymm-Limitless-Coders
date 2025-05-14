import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockProfiles = {
  1: { name: 'Sara Ali', field: 'Tech', projects: 'React frontend work' },
  2: { name: 'Omar Yehia', field: 'Pharma', projects: 'Lab analysis & research' },
  3: { name: 'Lina Nasser', field: 'Business', projects: 'Market data analysis' },
};

const InternProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const intern = mockProfiles[id];

  if (!intern) {
    return (
      <main className="form-container" style={{ paddingTop: '200px' }}>
        <div className="card">
          <p className="error-text">Intern not found.</p>
          <button className="btn-outline" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </main>
    );
  }

  return (
    <main className="form-container">
      
      <section className="card">
        <h2 className="card-header">Intern Profile</h2>
        <p><strong>Name:</strong> {intern.name}</p>
        <p><strong>Field:</strong> {intern.field}</p>
        <p><strong>Projects:</strong> {intern.projects}</p>
        <button className="btn-outline" onClick={() => navigate(-1)} aria-label="Go back to intern list">
          ← Back
        </button>
      </section>
    </main>
  );
};

export default InternProfile;
