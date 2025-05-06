import React from 'react';

function ReportCard({ report, onClick }) {
  return (
    <div>
      <h3>{report.studentName}</h3>
      <p>Major: {report.major}</p>
      <p>Status: {report.status}</p>
      <button onClick={onClick}>View Report</button>
    </div>
  );
}

export default ReportCard;