import React, { useState } from 'react';

//(FR 47)

const SubmitFinalReport = () => {
  const [report, setReport] = useState('');

  const handleChange = (e) => setReport(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Final Report Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Final Report</h3>
      <textarea
        placeholder="Write your final report here"
        value={report}
        onChange={handleChange}
      />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default SubmitFinalReport;
