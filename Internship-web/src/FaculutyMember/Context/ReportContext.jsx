import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

// Base company and supervisor lists
const companies = ['Tech Corp', 'Biz Ltd', 'InnovateX', 'GreenSoft', 'DataWave'];
const supervisors = ['John Manager', 'Susan Lead', 'Elena Smith', 'Ahmed Nabil', 'Hannah Ray'];
const statuses = ['Pending', 'Accepted', 'Flagged', 'Rejected'];
const studentNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
const majors = ['Computer Engineering', 'Software Engineering', 'Information Systems', 'Cybersecurity', 'Data Science'];

// Different dummy data sets based on localStorage
const getInitialReports = () => {
  const flag = localStorage.getItem('facultyType');

  if (flag === 'f1') {
    // Dummy data set for f1
    return Array.from({ length: 30 }, (_, i) => {
      const id = i + 1;
      const studentName = `${studentNames[i % studentNames.length]} ${Math.floor(i / 10) + 1}`;
      const major = majors[i % majors.length];
      return {
        id,
        studentName,
        major,
        companyName: companies[i % 3], // Limited to first 3 companies
        supervisor: supervisors[i % 2], // Limited to first 2 supervisors
        startDate: `2024-0${(i % 3) + 1}-01`,
        endDate: `2024-0${(i % 3) + 2}-30`,
        status: statuses[i % 2], // Only Pending or Accepted
        comments: [{ id: 1, text: `F1 Comment for report ${id}` }],
      };
    });
  } else if (flag === 'f2') {
    // Dummy data set for f2
    return Array.from({ length: 20 }, (_, i) => {
      const id = i + 1;
      const studentName = `${studentNames[i % 5]} ${Math.floor(i / 5) + 1}`; // Limited student names
      const major = majors[i % 2]; // Limited majors
      return {
        id,
        studentName,
        major,
        companyName: companies[(i % 2) + 3], // Last 2 companies
        supervisor: supervisors[(i % 3) + 2], // Last 3 supervisors
        startDate: `2025-0${(i % 2) + 1}-01`,
        endDate: `2025-0${(i % 2) + 2}-30`,
        status: statuses[(i % 2) + 2], // Only Flagged or Rejected
        comments: [{ id: 1, text: `F2 Comment for report ${id}` }],
      };
    });
  }

  // Default data if no flag or unrecognized flag
  return Array.from({ length: 50 }, (_, i) => {
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
      comments: [],
    };
  });
};

const getInitialEvaluations = () => {
  const flag = localStorage.getItem('facultyType');
  const reports = getInitialReports();

  if (flag === 'f1') {
    // Dummy evaluations for f1
    return Array.from({ length: 30 }, (_, i) => {
      const reportId = i + 1;
      const report = reports.find(r => r.id === reportId);
      const courses = ['CSEN701', 'CSEN702'];
      return {
        id: i + 1,
        reportId,
        rating: parseFloat((Math.random() * 1 + 4).toFixed(1)), // Ratings between 4.0 and 5.0
        course: courses[i % courses.length],
        companyName: report.companyName,
        studentName: report.studentName,
        major: report.major,
        supervisor: report.supervisor,
        startDate: report.startDate,
        endDate: report.endDate,
        reviewTimeDays: Math.floor(Math.random() * 3 + 1), // 1 to 3 days
      };
    });
  } else if (flag === 'f2') {
    // Dummy evaluations for f2
    return Array.from({ length: 20 }, (_, i) => {
      const reportId = i + 1;
      const report = reports.find(r => r.id === reportId);
      const courses = ['CSEN705', 'CSEN706'];
      return {
        id: i + 1,
        reportId,
        rating: parseFloat((Math.random() * 1 + 3).toFixed(1)), // Ratings between 3.0 and 4.0
        course: courses[i % courses.length],
        companyName: report.companyName,
        studentName: report.studentName,
        major: report.major,
        supervisor: report.supervisor,
        startDate: report.startDate,
        endDate: report.endDate,
        reviewTimeDays: Math.floor(Math.random() * 7 + 3), // 3 to 9 days
      };
    });
  }

  // Default evaluations
  return Array.from({ length: 50 }, (_, i) => {
    const reportId = i + 1;
    const report = reports.find(r => r.id === reportId);
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
};

export function ReportProvider({ children }) {
  const [reports, setReports] = useState(getInitialReports());
  const [evaluations] = useState(getInitialEvaluations());

  const updateReportStatus = (id, newStatus, newComment = null, deleteCommentId = null) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === parseInt(id)) {
          let updatedComments = r.comments || [];
          if (newComment) {
            updatedComments = [...updatedComments, newComment];
          } else if (deleteCommentId) {
            updatedComments = updatedComments.filter(c => c.id !== deleteCommentId);
          }
          return { ...r, status: newStatus, comments: updatedComments };
        }
        return r;
      })
    );
  };

  return (
    <ReportContext.Provider value={{ reports, evaluations, updateReportStatus }}>
      {children}
    </ReportContext.Provider>
  );
}

export const useReports = () => useContext(ReportContext);