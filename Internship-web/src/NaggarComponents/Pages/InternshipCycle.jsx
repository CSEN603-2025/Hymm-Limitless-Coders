import React, { useState } from 'react';

import '../Styles/InternshipCycle.css';

function InternshipCycle() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }
    setError('');
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    setSubmitted(true);
  };

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="page-wrapper">
      
      <main className="main-container">
        <header className="header">
          <h1 className="header-title">Set Internship Cycle Dates</h1>
        </header>

        <div className="form-container">
          <div className="form-group">
            <label className="label" htmlFor="start-date">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              data-tooltip="Select the internship start date"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="end-date">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              data-tooltip="Select the internship end date"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!startDate || !endDate}
            >
              Set Cycle Dates
            </button>
            {submitted && (
              <button className="btn-secondary" onClick={resetForm}>
                Reset
              </button>
            )}
          </div>

          {submitted && !error && (
            <div className="success-message">
              <p>
                Internship cycle set from <strong>{startDate}</strong> to{' '}
                <strong>{endDate}</strong>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default InternshipCycle;