import React from 'react';
import { useParams } from 'react-router-dom';

const dummyEvaluations = {
  1: {
    id: 1,
    student: 'Alice',
    major: 'CS',
    company: 'Tech Co',
    supervisor: 'Mr. A',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    notes: 'Student performed well.',
  },
};

function EvaluationReportDetails() {
  const { id } = useParams();
  const evalData = dummyEvaluations[id];

  if (!evalData) return <p>Evaluation not found.</p>;

  return (
    <div>
      
      <h1>Evaluation Report</h1>
      <p><strong>Student:</strong> {evalData.student}</p>
      <p><strong>Major:</strong> {evalData.major}</p>
      <p><strong>Company:</strong> {evalData.company}</p>
      <p><strong>Supervisor:</strong> {evalData.supervisor}</p>
      <p><strong>Start:</strong> {evalData.startDate}</p>
      <p><strong>End:</strong> {evalData.endDate}</p>
      <p><strong>Notes:</strong> {evalData.notes}</p>
    </div>
  );
}

export default EvaluationReportDetails;