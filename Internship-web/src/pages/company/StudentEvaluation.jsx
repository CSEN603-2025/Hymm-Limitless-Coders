import React, { useState } from 'react';

const StudentEvaluation = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    performance: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation Submitted:', formData);
    alert('Evaluation saved (simulated)');
  };

  return (
    <main className="form-container">
      <form className="form card" onSubmit={handleSubmit}>
        <h2 className="card-header">Evaluate a Student</h2>

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
          Submit Evaluation
        </button>
      </form>
    </main>
  );
};

export default StudentEvaluation;
