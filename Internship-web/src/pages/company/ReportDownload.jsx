import React from 'react';

const ReportDownload = () => {
  const handleDownload = () => {
    // Simulate PDF download
    alert('Download started (simulated). In a real app, this would fetch a PDF file.');
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
        
      <section className="card">
        <h2 className="card-header">Download Internship Report (PDF)</h2>
        <button
          className="btn-primary"
          onClick={handleDownload}
          aria-label="Download internship report PDF"
        >
          Download PDF
        </button>
      </section>
    </main>
  );
};

export default ReportDownload;
