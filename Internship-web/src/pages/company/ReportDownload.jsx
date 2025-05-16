import React from 'react';

const ReportDownload = () => {
  const handleDownloadPDF = () => {
    alert('Internship report PDF download started.');
  };

  const handleDownloadDocument = () => {
    alert('Uploaded document download started.');
  };

  const handleDownloadEvaluations = () => {
    alert('All evaluations document download started.');
  };

  return (
    <main
      className="form-container"
      style={{
        paddingTop: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Section 1: Internship Report PDF */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Download Internship Report (PDF)
        </h2>
        <button
          className="btn-primary"
          onClick={handleDownloadPDF}
          aria-label="Download internship report PDF"
        >
          Download report
        </button>
      </section>

      {/* Section 2: Uploaded Document */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Download Uploaded Document
        </h2>
        <button
          className="btn-primary"
          onClick={handleDownloadDocument}
          aria-label="Download uploaded document"
        >
          Download the Uploaded Document used for verification
        </button>
      </section>

      {/* Section 3: All Evaluations */}
      <section className="card">
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Download All Evaluations Document
        </h2>
        <button
          className="btn-primary"
          onClick={handleDownloadEvaluations}
          aria-label="Download all evaluations document"
        >
          Download All Evaluations Submitted
        </button>
      </section>
    </main>
  );
};

export default ReportDownload;
