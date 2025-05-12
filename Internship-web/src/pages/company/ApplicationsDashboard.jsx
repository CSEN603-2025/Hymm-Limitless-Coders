import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyHome from './CompanyHome';
const mockApplications = [
  { id: 1, applicant: 'Sara Ali', postId: 1, postTitle: 'Frontend Developer Intern', status: 'Pending', email: 'sara@example.com' },
  { id: 2, applicant: 'Omar Yehia', postId: 2, postTitle: 'Pharma Research Intern', status: 'Pending', email: 'omar@example.com' },
  { id: 3, applicant: 'Lina Nasser', postId: 1, postTitle: 'Frontend Developer Intern', status: 'Pending', email: 'lina@example.com' },
];

const ApplicationsDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filterPostId, setFilterPostId] = useState('');

  useEffect(() => {
    setApplications(mockApplications); // Simulated fetch
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const uniquePosts = Array.from(
    new Map(applications.map(app => [app.postId, { id: app.postId, title: app.postTitle }])).values()
  );

  const filteredApps = applications.filter(app =>
    filterPostId ? app.postId === parseInt(filterPostId) : true
  );

  return (
    <main className="applications-dashboard" style={{ paddingTop: '200px' }}>
        <CompanyHome />
      <section className="card">
        <h2 className="card-header">Applications Dashboard</h2>

        <div className="filter-container">
          <label htmlFor="filter" className="label">Filter by Internship Post:</label>
          <select
            id="filter"
            className="input"
            value={filterPostId}
            onChange={(e) => setFilterPostId(e.target.value)}
          >
            <option value="">All Posts</option>
            {uniquePosts.map((post) => (
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
                <td className="table-cell">{app.applicant}</td>
                <td className="table-cell">{app.email}</td>
                <td className="table-cell">{app.postTitle}</td>
                <td className="table-cell">
                  <select
                    className="input"
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
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
          <button className="btn-outline" onClick={() => navigate('/')}>← Back to Dashboard</button>
        </div>
      </section>
    </main>
  );
};

export default ApplicationsDashboard;
