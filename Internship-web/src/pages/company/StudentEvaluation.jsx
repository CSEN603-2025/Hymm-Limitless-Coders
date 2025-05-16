// src/pages/company/StudentEvaluation.jsx
import React, { useState } from 'react';

const mockEvaluationsByCompany = {
  'company1@test.com': [
    {
      id: 1,
      studentName: 'Sara Ali',
      performance: 4,
      comment: 'Sara showed great commitment and teamwork during the internship.'
    }
  ],
  'company2@test.com': [
    {
      id: 2,
      studentName: 'Hassan Ali',
      performance: 5,
      comment: 'Hassan delivered excellent data models and clear visualizations.'
    }
  ]
};

const StudentEvaluation = () => {
  // 1) pick the right initial set based on who’s logged in
  const stored = localStorage.getItem('userProfile') || '{}';
  const { email } = JSON.parse(stored);
  const initialEvals = mockEvaluationsByCompany[email] || [];

  const [evaluations, setEvaluations] = useState(initialEvals);

  const [formData, setFormData] = useState({
    studentName: '',
    performance: '',
    comment: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId !== null) {
      setEvaluations(prev =>
        prev.map(entry =>
          entry.id === editingId ? { ...entry, ...formData } : entry
        )
      );
      alert('Evaluation updated!');
    } else {
      const newEntry = {
        id: Date.now(),
        ...formData
      };
      setEvaluations(prev => [newEntry, ...prev]); // newest on top
      alert('Evaluation submitted!');
    }
    setFormData({ studentName: '', performance: '', comment: '' });
    setEditingId(null);
  };

  const handleEdit = entry => {
    setFormData({
      studentName: entry.studentName,
      performance: entry.performance,
      comment: entry.comment
    });
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      setEvaluations(prev => prev.filter(entry => entry.id !== id));
    }
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Evaluation List */}
      <section className="card" style={{ marginBottom: '40px' }}>
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Submitted Evaluations
        </h2>
        {evaluations.length === 0 ? (
          <p>No evaluations submitted yet.</p>
        ) : (
          <ul className="evaluation-list">
            {evaluations.map(entry => (
              <li key={entry.id} className="card" style={{ marginTop: '10px' }}>
                <p><strong>{entry.studentName}</strong> — Rated {entry.performance}/5</p>
                <p style={{ fontStyle: 'italic' }}>{entry.comment}</p>
                <button className="btn-outline" onClick={() => handleEdit(entry)}>Edit</button>
                <button
                  className="btn-outline"
                  style={{ marginLeft: '8px' }}
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Form */}
      <form className="form card" onSubmit={handleSubmit}>
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          {editingId ? 'Edit Evaluation' : 'Evaluate a Student'}
        </h2>

        <label htmlFor="studentName" className="label">Student Name</label>
        <input
          id="studentName"
          name="studentName"
          className="input"
          placeholder="e.g., Lina Nasser"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label htmlFor="performance" className="label">Performance (1–5)</label>
        <input
          id="performance"
          type="number"
          name="performance"
          className="input"
          min="1"
          max="5"
          placeholder="Rate 1 to 5"
          value={formData.performance}
          onChange={handleChange}
          required
        />

        <label htmlFor="comment" className="label">Comments</label>
        <textarea
          id="comment"
          name="comment"
          className="input"
          placeholder="Write a comment..."
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary" aria-label="Submit student evaluation">
          {editingId ? 'Update Evaluation' : 'Submit Evaluation'}
        </button>
      </form>
    </main>
  );
};

export default StudentEvaluation;
