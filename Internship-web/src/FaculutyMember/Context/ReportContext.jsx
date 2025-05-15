import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

const companies = ['Tech Corp', 'Biz Ltd', 'InnovateX', 'GreenSoft', 'DataWave'];
const supervisors = ['John Manager', 'Susan Lead', 'Elena Smith', 'Ahmed Nabil', 'Hannah Ray'];
const statuses = ['Pending', 'Accepted', 'Flagged', 'Rejected'];
const studentNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
const majors = ['Computer Engineering', 'Software Engineering', 'Information Systems', 'Cybersecurity', 'Data Science'];

export const initialReports = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const studentName = `${studentNames[i % studentNames.length]} ${Math.floor(i / 10) + 1}`;
  const major = majors[i % majors.length];

  return {
    id,
    studentName,
    major,
    companyName: companies[i % companies.length],
    supervisor: supervisors[i % supervisors.length],
    startDate: `2024-0${(i % 6) + 1}-01`,
    endDate: `2024-0${(i % 6) + 2}-30`,
    status: statuses[i % statuses.length],
  };
});

export const initialEvaluations = Array.from({ length: 100 }, (_, i) => {
  const reportId = (i % 50) + 1;
  const report = initialReports.find(r => r.id === reportId);
  const courses = ['CSEN703', 'CSEN707', 'CSEN701', 'CSEN704'];

  return {
    id: i + 1,
    reportId,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Ratings between 3.0 and 5.0
    course: courses[i % courses.length],
    companyName: report.companyName,
    studentName: report.studentName,
    major: report.major,
    supervisor: report.supervisor,
    startDate: report.startDate,
    endDate: report.endDate,
    reviewTimeDays: Math.floor(Math.random() * 5 + 1), // 1 to 5 days
  };
});

export function ReportProvider({ children }) {
  const [reports, setReports] = useState(initialReports);
  const [evaluations] = useState(initialEvaluations);

  const updateReportStatus = (id, newStatus) => {
    setReports(prev =>
      prev.map(r => (r.id === parseInt(id) ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <ReportContext.Provider value={{ reports, evaluations, updateReportStatus }}>
      {children}
    </ReportContext.Provider>
  );
}

export const useReports = () => useContext(ReportContext);