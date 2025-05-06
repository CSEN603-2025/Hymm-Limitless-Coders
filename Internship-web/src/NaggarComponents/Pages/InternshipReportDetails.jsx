import React from 'react';
import { useParams } from 'react-router-dom';
import { useReports } from '../Context/ReportContext';

function InternshipReportDetails() {
  const { id } = useParams();
  const { reports, evaluations, updateReportStatus } = useReports();
  const report = reports.find(r => r.id === parseInt(id));
  const evaluation = evaluations[id];

  if (!report) return <p>Report not found.</p>;

  const handleChangeStatus = (newStatus) => {
    updateReportStatus(id, newStatus);
  };

  return (
    <div>
      <h1>Internship Report</h1>
      <p><strong>Student:</strong> {report.studentName}</p>
      <p><strong>Content:</strong> {report.content}</p>
      <p><strong>Status:</strong> {report.status}</p>

      <div>
        <button onClick={() => handleChangeStatus('Accepted')}>Accept</button>
        <button onClick={() => handleChangeStatus('Rejected')}>Reject</button>
        <button onClick={() => handleChangeStatus('Flagged')}>Flag</button>
      </div>

      <hr />
      <h2>Evaluation Report</h2>
      {evaluation ? (
        <div>
          <p><strong>Student:</strong> {evaluation.studentName}</p>
          <p><strong>Company:</strong> {evaluation.companyName}</p>
          <p><strong>Supervisor:</strong> {evaluation.supervisor}</p>
          <p><strong>Start Date:</strong> {evaluation.startDate}</p>
          <p><strong>End Date:</strong> {evaluation.endDate}</p>
        </div>
      ) : (
        <p>No evaluation report found.</p>
      )}
    </div>
  );
}

export default InternshipReportDetails;