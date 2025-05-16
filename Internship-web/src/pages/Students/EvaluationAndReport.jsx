import React, { useState } from 'react';

const EvaluationAndReport = () => {
  const [evaluation, setEvaluation] = useState({
    rating: '',
    feedback: '',
  });

  const [report, setReport] = useState({
    title: '',
    intro: '',
    body: '',
  });

  const handleEvalChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({ ...prev, [name]: value }));
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation:', evaluation);
    console.log('Report:', report);
    alert('Submitted! (simulated)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Company Evaluation</h2>
      <label>
        Rating (1–5):
        <input type="number" name="rating" value={evaluation.rating} onChange={handleEvalChange} min="1" max="5" />
      </label>
      <br />
      <label>
        Feedback:
        <textarea name="feedback" value={evaluation.feedback} onChange={handleEvalChange} />
      </label>

      <h2>Internship Report</h2>
      <label>
        Title:
        <input type="text" name="title" value={report.title} onChange={handleReportChange} />
      </label>
      <br />
      <label>
        Introduction:
        <textarea name="intro" value={report.intro} onChange={handleReportChange} />
      </label>
      <br />
      <label>
        Body:
        <textarea name="body" value={report.body} onChange={handleReportChange} />
      </label>

      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default EvaluationAndReport;
