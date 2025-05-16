// src/pages/company/PostList.jsx
import React, { useState } from 'react';

// 1. All dummy posts grouped by company email
const mockPostsByCompany = {
  'company1@test.com': [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      field: 'Tech',
      appCount: 1,
      isPaid: true,
      expectedSalary: '500 USD/month',
      skills: 'React, JavaScript, CSS',
      description: 'Work on the company website UI.'
    },
    {
      id: 2,
      title: 'Pharma Research Intern',
      field: 'Pharma',
      appCount: 1,
      isPaid: false,
      expectedSalary: '',
      skills: 'Lab work, Data analysis',
      description: 'Assist in lab experiments and data collection.'
    },
    {
      id: 3,
      title: 'Marketing Intern',
      field: 'Business',
      appCount: 1,
      isPaid: true,
      expectedSalary: '300 USD/month',
      skills: 'Content creation, SEO',
      description: 'Help create marketing materials and SEO strategy.'
    },
    {
      id: 4,
      title: 'Backend Intern',
      field: 'Tech',
      appCount: 0,
      isPaid: false,
      expectedSalary: '',
      skills: 'Node.js, Databases',
      description: 'Develop API endpoints and database schemas.'
    },
  ],
  'company2@test.com': [
    {
      id: 5,
      title: 'Data Analyst Intern',
      field: 'Data Analysis',
      appCount: 1,                // e.g. Hassan Ali applied
      isPaid: true,
      expectedSalary: '400 USD/month',
      skills: 'Data modeling, Visualization',
      description: 'Analyze datasets and build dashboards.'
    },
    {
      id: 6,
      title: 'Marketing Intern',
      field: 'Business',
      appCount: 1,                // e.g. Lina Nasser applied
      isPaid: true,
      expectedSalary: '300 USD/month',
      skills: 'Content creation, SEO',
      description: 'Assist in crafting marketing campaigns.'
    }
  ]
};

const PostList = () => {
  // 2. Read logged-in company email from localStorage
  const stored = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(stored);

  // 3. Initialize state to the correct dummy array
  const [posts, setPosts] = useState(mockPostsByCompany[email] || []);

  const [searchTerm, setSearchTerm]   = useState('');
  const [filterField, setFilterField] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    field: '',
    appCount: 0,
    isPaid: false,
    expectedSalary: '',
    skills: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  // FILTER + SEARCH
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField  = filterField ? post.field === filterField : true;
    return matchesSearch && matchesField;
  });

  // FORM HANDLERS
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'       ? checked
      : name === 'appCount'      ? parseInt(value, 10) || 0
      :                             value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId != null) {
      // UPDATE
      setPosts(prev =>
        prev.map(p => p.id === editingId ? { ...p, ...formData } : p)
      );
      alert('Post updated!');
    } else {
      // CREATE
      const newPost = { id: Date.now(), ...formData };
      setPosts(prev => [newPost, ...prev]);
      alert('Post created!');
    }
    setFormData({
      title: '',
      field: '',
      appCount: 0,
      isPaid: false,
      expectedSalary: '',
      skills: '',
      description: ''
    });
    setEditingId(null);
  };

  const handleEdit = post => {
    setFormData({
      title: post.title,
      field: post.field,
      appCount: post.appCount,
      isPaid: post.isPaid,
      expectedSalary: post.expectedSalary,
      skills: post.skills,
      description: post.description
    });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = id => {
    if (window.confirm('Delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <main
      className="form-container"
      style={{ paddingTop: 200, display: 'flex', flexDirection: 'column', gap: 32 }}
    >
      {/* SEARCH & FILTER */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Your Internship Posts
        </h2>
        <div className="filter-container" style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <input
            type="text"
            className="input"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="input"
            value={filterField}
            onChange={e => setFilterField(e.target.value)}
          >
            <option value="">All Fields</option>
            <option value="Tech">Tech</option>
            <option value="Pharma">Pharma</option>
            <option value="Business">Business</option>
            <option value="Data Analysis">Data Analysis</option>
          </select>
        </div>
      </section>

      {/* POSTS LIST */}
      <section className="card">
        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredPosts.map(post => (
              <li
                key={post.id}
                className="card"
                style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <p><strong>{post.title}</strong></p>
                <p>{post.field} | Applications: {post.appCount}</p>
                <p>Type: {post.isPaid ? 'Paid' : 'Unpaid'}</p>
                {post.isPaid && <p>Expected Salary: {post.expectedSalary}</p>}
                <p>Skills Required: {post.skills}</p>
                <p>Description: {post.description}</p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginTop: 12,
                    width: '100%'
                  }}
                >
                  <button
                    className="btn-outline"
                    style={{ width: '100%' }}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-outline"
                    style={{ width: '100%' }}
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ADD / EDIT FORM */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          {editingId ? 'Edit Internship Post' : 'Create New Internship Post'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="label">Title</label>
          <input
            name="title"
            className="input"
            placeholder="e.g., Frontend Developer Intern"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label className="label">Field</label>
          <select name="field" className="input" value={formData.field} onChange={handleChange} required>
            <option value="" disabled>Select field</option>
            <option value="Tech">Tech</option>
            <option value="Pharma">Pharma</option>
            <option value="Business">Business</option>
            <option value="Data Analysis">Data Analysis</option>
          </select>

          <label className="label">Application Count</label>
          <input
            name="appCount"
            type="number"
            min="0"
            className="input"
            value={formData.appCount}
            onChange={handleChange}
            required
          />

          <label className="label">
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
            />{' '}
            Paid
          </label>

          {formData.isPaid && (
            <>
              <label className="label">Expected Salary</label>
              <input
                name="expectedSalary"
                className="input"
                placeholder="e.g., 500 USD/month"
                value={formData.expectedSalary}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label className="label">Skills Required</label>
          <input
            name="skills"
            className="input"
            placeholder="Comma-separated skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <label className="label">Job Description</label>
          <textarea
            name="description"
            className="input"
            placeholder="Describe the internship role..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">
            {editingId ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default PostList;
