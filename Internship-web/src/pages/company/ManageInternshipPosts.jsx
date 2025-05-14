import React, { useState } from 'react';

const ManageInternshipPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
  });
  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    if (!newPost.title || !newPost.description) return;
    const id = Date.now();
    setPosts([...posts, { id, ...newPost }]);
    setNewPost({ title: '', description: '' });
    setNotification(`New application received for: "${newPost.title}"`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleEdit = (id, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
        
      <section className="card">
        <h2 className="card-header">Manage Internship Posts</h2>

        <label className="label" htmlFor="post-title">Title</label>
        <input
          id="post-title"
          className="input"
          name="title"
          placeholder="e.g. React Developer Intern"
          value={newPost.title}
          onChange={handleChange}
          required
        />

        <label className="label" htmlFor="post-desc">Description</label>
        <textarea
          id="post-desc"
          className="input"
          name="description"
          placeholder="Internship responsibilities..."
          value={newPost.description}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" onClick={handleCreate}>
          Create Post
        </button>

        {notification && (
          <p className="status-accepted" style={{ marginTop: '12px' }}>
            {notification}
          </p>
        )}
      </section>

      <section className="card" style={{ marginTop: '24px' }}>
        <h3 className="card-header">Posted Internships</h3>
        {posts.length === 0 && <p>No posts yet.</p>}
        <ul className="intern-list">
          {posts.map((post) => (
            <li key={post.id} className="card" style={{ padding: '16px' }}>
              <label className="label" htmlFor={`edit-title-${post.id}`}>Title</label>
              <input
                id={`edit-title-${post.id}`}
                className="input"
                value={post.title}
                onChange={(e) => handleEdit(post.id, 'title', e.target.value)}
              />

              <label className="label" htmlFor={`edit-desc-${post.id}`}>Description</label>
              <textarea
                id={`edit-desc-${post.id}`}
                className="input"
                value={post.description}
                onChange={(e) => handleEdit(post.id, 'description', e.target.value)}
              />

              <button
                className="btn-outline"
                onClick={() => handleDelete(post.id)}
                style={{ marginTop: '12px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ManageInternshipPosts;
