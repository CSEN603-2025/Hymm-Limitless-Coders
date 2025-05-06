import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportCard from '../Components /ReportCard';
import { useReports } from '../Context/ReportContext';

function InternshipReports() {
  const { reports } = useReports();
  const [majorFilter, setMajorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const filtered = reports.filter(r =>
    (majorFilter === '' || r.major === majorFilter) &&
    (statusFilter === '' || r.status === statusFilter)
  );

  return (
    <div>
      <h1>Internship Reports</h1>

      <label>
        Filter by Major:
        <select value={majorFilter} onChange={e => setMajorFilter(e.target.value)}>
          <option value="">All</option>
          <option value="CS">CS</option>
          <option value="Business">Business</option>
        </select>
      </label>

      <label>
        Filter by Status:
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Flagged">Flagged</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      </label>

      {filtered.map(report => (
        <ReportCard
          key={report.id}
          report={report}
          onClick={() => navigate(`/internship-reports/${report.id}`)}
        />
      ))}
    </div>
  );
}

export default InternshipReports;