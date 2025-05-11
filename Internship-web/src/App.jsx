// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SuggestedCompanies from './pages/Students/SuggestedCompanies';
import EditProfile from './pages/Students/EditProfile';
import MajorsList from './pages/Students/MajorsList';
import SelectMajorSemester from './pages/Students/SelectMajorSemester';
import Internships from './pages/Students/Internships';
import InternshipDetails from './pages/Students/InternshipDetails';
import MyApplications from './pages/Students/MyApplications';
import PastInternships from './pages/Students/PastInternships';
import InternshipHistoryDetails from './pages/Students/InternshipHistoryDetails';
import EvaluationAndReport from './pages/Students/EvaluationAndReport';
import FinalReportSubmission from './pages/Students/FinalReportSubmission';
import Home from './pages/Students/Home';
import StudentUtilities from './pages/company/StudentUtilities';

import CompanyHome from './pages/company/CompanyHome';
import RegisterCompany from './pages/company/RegisterCompany';
import ManageInternshipPosts from './pages/company/ManageInternshipPosts';
import PostList from './pages/company/PostList';
import ApplicationsDashboard from './pages/company/ApplicationsDashboard';
import Interns from './pages/company/Interns';
import InternProfile from './pages/company/InternProfile';
import StudentEvaluation from './pages/company/StudentEvaluation';
import ReportDownload from './pages/company/ReportDownload';
import Login from './pages/Login';

import UploadDocs from './pages/company/UploadDocs';
import Notifications from './pages/company/Notifications';
import ApplicationAlerts from './pages/company/ApplicationAlerts'; // ✅ Add this at the top


import NaggarRoutes from './pages/Naggar/NaggarRoutes';



const App = () => {
  return (
    <Routes>
      {/* Student routes */}
      <Route path="/suggested-companies" element={<SuggestedCompanies />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/majors" element={<MajorsList />} />
      <Route path="/select-major-semester" element={<SelectMajorSemester />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/internships/:id" element={<InternshipDetails />} />
      <Route path="/my-applications" element={<MyApplications />} />
      <Route path="/internship-history" element={<PastInternships />} />
      <Route path="/internship-history/:id" element={<InternshipHistoryDetails />} />
      <Route path="/evaluation-report" element={<EvaluationAndReport />} />
      <Route path="/final-report" element={<FinalReportSubmission />} />
      <Route path="/student" element={<Home />} />
      <Route path="/student/notifications" element={<StudentUtilities />} />
      <Route path="/student/internship-video" element={<StudentUtilities />} />

      {/* Company routes */}
      <Route path="/company" element={<CompanyHome />} />
      <Route path="/company/register" element={<RegisterCompany />} />
      <Route path="/company/manage-posts" element={<ManageInternshipPosts />} />
      <Route path="/company/posts" element={<PostList />} />
      <Route path="/company/applications" element={<ApplicationsDashboard />} />
      <Route path="/company/interns" element={<Interns />} />
      <Route path="/company/intern/:id" element={<InternProfile />} />
      <Route path="/company/evaluations" element={<StudentEvaluation />} />
      <Route path="/reports" element={<ReportDownload />} />
      <Route path="/login" element={<Login />} />

      <Route path="/company/upload-docs" element={<UploadDocs />} />
      <Route path="/company/notifications" element={<Notifications />} />
      <Route path="/company/app-alerts" element={<ApplicationAlerts />} />

      <Route path="/admin" element={<NaggarRoutes />} />



    </Routes>
  );
};

export default App;
