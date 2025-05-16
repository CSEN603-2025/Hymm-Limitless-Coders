// src/pages/company/ManageInternshipPosts.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockPosts = [
  {
    id: 1,
    companyName: 'OpenAI',
    title: 'Frontend Developer Intern',
    industry: 'Tech',
    duration: '3 months',
    isPaid: true,
    expectedSalary: '500 USD/month',
    skills: 'React, JavaScript, CSS',
    description: 'Build and maintain UI components.'
  },
  {
    id: 2,
    companyName: 'PharmaCorp',
    title: 'Pharma Research Intern',
    industry: 'Pharma',
    duration: '6 months',
    isPaid: false,
    expectedSalary: '',
    skills: 'Lab techniques, Data analysis',
    description: 'Assist research team with experiments.'
  },
  {
    id: 3,
    companyName: 'MarketGuru',
    title: 'Marketing Intern',
    industry: 'Business',
    duration: '3 months',
    isPaid: true,
    expectedSalary: '300 USD/month',
    skills: 'Content creation, SEO',
    description: 'Develop marketing content and SEO strategies.'
  },
  {
    id: 4,
    companyName: 'DataSys',
    title: 'Backend Intern',
    industry: 'Tech',
    duration: '6 months',
    isPaid: false,
    expectedSalary: '',
    skills: 'Node.js, SQL',
    description: 'Implement backend APIs and database schemas.'
  },
];

const ManageInternshipPosts = () => {
  const navigate = useNavigate();
  const { id } = useParams();               // ← read the :id param
  const [posts, setPosts] = useState([]);

  // filter/search state only used in list view
  const [searchTerm,    setSearchTerm]    = useState('');
  const [filterIndustry,setFilterIndustry]= useState('');
  const [filterDuration,setFilterDuration]= useState('');
  const [filterPaid,    setFilterPaid]    = useState('all');

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  // If there's an :id, render the **detail** view:
  if (id) {
    const post = posts.find(p => p.id === Number(id));
    return (
      <main className="form-container" style={{ paddingTop: 200 }}>
        <section className="card">
          {post ? (
            <>
              <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
                {post.title}
              </h2>
              <p><strong>Company:</strong> {post.companyName}</p>
              <p><strong>Industry:</strong> {post.industry}</p>
              <p><strong>Duration:</strong> {post.duration}</p>
              <p><strong>Type:</strong> {post.isPaid ? 'Paid' : 'Unpaid'}</p>
              {post.isPaid && <p><strong>Expected Salary:</strong> {post.expectedSalary}</p>}
              <p><strong>Skills Required:</strong> {post.skills}</p>
              <p><strong>Description:</strong> {post.description}</p>
              <button
                className="btn-outline"
                style={{ marginTop: 16 }}
                onClick={() => navigate('/company/manage-posts')}
              >
                ← Back to List
              </button>
            </>
          ) : (
            <>
              <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
                Internship Not Found
              </h2>
              <p>This internship doesn't exist.</p>
              <button
                className="btn-outline"
                style={{ marginTop: 16 }}
                onClick={() => navigate('/company/manage-posts')}
              >
                ← Back to List
              </button>
            </>
          )}
        </section>
      </main>
    );
  }

  // --- Otherwise render the LIST ---
  const filtered = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry ? post.industry === filterIndustry : true;
    const matchesDuration = filterDuration ? post.duration === filterDuration : true;
    const matchesPaid =
      filterPaid === 'all'
        ? true
        : filterPaid === 'paid'
        ? post.isPaid
        : !post.isPaid;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  return (
    <main
      className="form-container"
      style={{ paddingTop: 200, display: 'flex', flexDirection: 'column', gap: 32 }}
    >
      {/* SEARCH & FILTER */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          SCAD Available Internships
        </h2>
        <div
          className="filter-container"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}
        >
          <input
            type="text"
            className="input"
            placeholder="Search by title or company"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ minWidth: 300 }}
          />
          <select
            className="input"
            value={filterIndustry}
            onChange={e => setFilterIndustry(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <option value="">All Industries</option>
            <option value="Tech">Tech</option>
            <option value="Pharma">Pharma</option>
            <option value="Business">Business</option>
          </select>
          <select
            className="input"
            value={filterDuration}
            onChange={e => setFilterDuration(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <option value="">All Durations</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
          </select>
          <select
            className="input"
            value={filterPaid}
            onChange={e => setFilterPaid(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <option value="all">All Types</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </section>

      {/* LIST */}
      <section className="card">
        {filtered.length === 0 ? (
          <p>No internships match your criteria.</p>
        ) : (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(post => (
              <li
                key={post.id}
                className="card"
                style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <p>
                  <strong>{post.companyName}</strong> — {post.title}
                </p>
                <p>{post.duration} | {post.isPaid ? 'Paid' : 'Unpaid'}</p>
                <button
                  className="btn-outline"
                  style={{ alignSelf: 'flex-start', marginTop: 12, minWidth: 120 }}
                  onClick={() => navigate(`/company/manage-posts/${post.id}`)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default ManageInternshipPosts;
