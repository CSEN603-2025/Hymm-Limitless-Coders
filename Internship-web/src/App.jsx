import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './NaggarComponents/Pages/CompanyJoinList';
import CompanyPage from './NaggarComponents/Pages/CompanyDetails';
import InternshipCycle from './NaggarComponents/Pages/InternshipCycle';
import StudentList from './NaggarComponents/Pages/StudentList';
import StudentProfilePage from './NaggarComponents/Pages/StudentProfilePage';
import InternshipReportDetails from './NaggarComponents/Pages/InternshipReportDetails';
import InternshipReports from './NaggarComponents/Pages/InternshipReports';
import EvaluationReportDetails from './NaggarComponents/Pages/EvaluationReportDetails';
import Statistics from './NaggarComponents/Pages/Statistics';
import RequestAppointment from './NaggarComponents/Pages/RequestAppointment';
import AppointmentRequests from './NaggarComponents/Pages/AppointmentRequests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/company/:id" element={<CompanyPage />} />
      <Route path="/InternshipCycle" element={<InternshipCycle />} />
      <Route path="/StudentList" element={<StudentList />} />
      <Route path="/StudentProfilePage" element={<StudentProfilePage />} />
      <Route path="/internship-reports" element={<InternshipReports />} />
      <Route path="/internship-reports/:id" element={<InternshipReportDetails />} />
      <Route path="/evaluation-reports/:id" element={<EvaluationReportDetails />} />
      <Route path="/Statistics" element={<Statistics />} />
      <Route path="/RequestAppointment" element={<RequestAppointment />} />
      <Route path="/AppointmentRequests" element={<AppointmentRequests />} />
    </Routes>
   
  );
}

export default App;
