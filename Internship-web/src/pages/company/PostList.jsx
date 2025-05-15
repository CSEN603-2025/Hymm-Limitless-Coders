import React, { useState, useEffect } from 'react';

const mockPosts = [
  { id: 1, title: 'Frontend Developer Intern', field: 'Tech', appCount: 4 },
  { id: 2, title: 'Pharma Research Intern', field: 'Pharma', appCount: 2 },
  { id: 3, title: 'Marketing Intern', field: 'Business', appCount: 6 },
  { id: 4, title: 'Backend Intern', field: 'Tech', appCount: 1 },
];

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('');
 
  useEffect(() => {
    setPosts(mockPosts); // Simulate API call
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = filterField ? post.field === filterField : true;
    return matchesSearch && matchesField;
  });

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
        
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>Your Internship Posts</h2>

        <div className="filter-container">
          <input
            type="text"
            className="input"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search internship title"
          />

          <select
            className="input"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            aria-label="Filter by internship field"
          >
            <option value="">All Fields</option>
            <option value="Tech">Tech</option>
            <option value="Pharma">Pharma</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <p style={{ marginTop: '16px' }}>No posts found.</p>
        ) : (
          <ul className="intern-list" style={{ marginTop: '16px' }}>
            {filteredPosts.map((post) => (
              <li key={post.id} className="card" style={{ padding: '16px' }}>
                <p><strong>{post.title}</strong></p>
                <p>{post.field} | Applications: {post.appCount}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default PostList;
