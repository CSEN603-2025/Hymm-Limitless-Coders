import React, { useState } from 'react';

function InternshipCycle() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Normally this would send to backend
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Set Internship Cycle Dates</h1>

      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>

      <br />

      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>

      <br />

      <button onClick={handleSubmit}>Set Cycle Dates</button>

      {submitted && (
        <p>
          Internship cycle set from <strong>{startDate}</strong> to <strong>{endDate}</strong>
        </p>
      )}
    </div>
  );
}

export default InternshipCycle;