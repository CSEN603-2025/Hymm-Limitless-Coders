import React, { useState } from 'react';
// (FR 43)
const CompanyEvaluation = ({ company }) => {
  const [evaluation, setEvaluation] = useState({ rating: 0, feedback: '' });

  const handleChange = (e) => {
    setEvaluation({ ...evaluation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Company Evaluation Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Evaluate {company.name}</h3>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={evaluation.rating}
        onChange={handleChange}
        min="1"
        max="5"
      />
      <textarea
        name="feedback"
        placeholder="Your feedback"
        value={evaluation.feedback}
        onChange={handleChange}
      />
      <button type="submit">Submit Evaluation</button>
    </form>
  );
};

export default CompanyEvaluation;
