// src/pages/company/ApplicationsDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockApplicationsByCompany = {
  'company1@test.com': [
    { id: 1, applicant: 'Sara Ali', postId: 1, postTitle: 'Frontend Developer Intern', status: 'Pending', email: 'sara@example.com' },
    { id: 2, applicant: 'Omar Yehia', postId: 2, postTitle: 'Pharma Research Intern', status: 'Pending', email: 'omar@example.com' },
    { id: 3, applicant: 'Lina Nasser', postId: 3, postTitle: 'Marketing Intern', status: 'Pending', email: 'lina@example.com' },
  ],
  'company2@test.com': [
    { id: 4, applicant: 'Lina Nasser', postId: 1, postTitle: 'Marketing Intern', status: 'Pending', email: 'lina@example.com' },
    { id: 5, applicant: 'Hassan Ali', postId: 4, postTitle: 'Data Analyst Intern', status: 'Pending', email: 'hassan@example.com' },
  ]
};

const ApplicationsDashboard = () => {
  const navigate = useNavigate();

  // 1. Read logged-in email from localStorage.userProfile
  const storedProfile = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(storedProfile);

  // 2. Initialize applications state to the correct dummy set
  const initialApps = mockApplicationsByCompany[email] || [];
  const [applications, setApplications] = useState(initialApps);
  const [filterPostId, setFilterPostId] = useState('');

  // 3. Update status in state
  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  // 4. Build unique post list for the filter dropdown
  const uniquePosts = Array.from(
    new Map(applications.map(app => [app.postId, { id: app.postId, title: app.postTitle }])).values()
  );

  // 5. Apply filter by postId
  const filteredApps = applications.filter(app =>
    filterPostId ? app.postId === parseInt(filterPostId, 10) : true
  );

  return (
    <main className="applications-dashboard" style={{ paddingTop: '200px' }}>
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Applications Dashboard
        </h2>

        <div className="filter-container">
          <label htmlFor="filter" className="label">Filter by Internship Post:</label>
          <select
            id="filter"
            className="input"
            value={filterPostId}
            onChange={e => setFilterPostId(e.target.value)}
          >
            <option value="">All Posts</option>
            {uniquePosts.map(post => (
              <option key={post.id} value={post.id}>{post.title}</option>
            ))}
          </select>
        </div>

        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">Applicant</th>
              <th className="table-cell">Email</th>
              <th className="table-cell">Post</th>
              <th className="table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map(app => (
              <tr key={app.id} className="table-row">
                <td className="table-cell">
                  {app.applicant}
                  <button
                    className="btn-outline"
                    style={{ marginLeft: '8px', padding: '4px 8px', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/company/intern/${app.id}`)}
                    aria-label={`View profile of ${app.applicant}`}
                  >
                    View Profile
                  </button>
                </td>
                <td className="table-cell">{app.email}</td>
                <td className="table-cell">{app.postTitle}</td>
                <td className="table-cell">
                  <select
                    className="input"
                    value={app.status}
                    onChange={e => handleStatusChange(app.id, e.target.value)}
                    aria-label={`Change status for ${app.applicant}`}
                  >
                    <option>Pending</option>
                    <option>Accepted</option>
                    <option>Rejected</option>
                    <option>Finalised</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination" style={{ marginTop: '16px' }}>
          <button className="btn-outline" onClick={() => navigate('/company')}>
            ← Back to Dashboard
          </button>
        </div>
      </section>
    </main>
  );
};

export default ApplicationsDashboard;
