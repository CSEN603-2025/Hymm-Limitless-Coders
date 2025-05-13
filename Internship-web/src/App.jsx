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
import ManageAppointments from './NaggarComponents/Pages/ManageAppointments';
import CallInterface from './NaggarComponents/Pages/CallInterface';
import Notification from './NaggarComponents/Pages/Notification';
import EditProfile from './Mohamed/components/EditProfile';
import MajorsList from './Mohamed/components/MajorsList';
import SelectMajorSemester from './Mohamed/components/SelectMajorSemester';
import InternshipsList from './Mohamed/components/InternshipList';
import InternshipDetails from './Mohamed/components/InternshipDetails';
import ApplyInternship from './Mohamed/components/ApplyInternship';
import ApplicationStatus from './Mohamed/components/ApplicationStatus';
import RegisterCompany from './pages/company/RegisterCompany';
import ManageInternshipPosts from './pages/company/ManageInternshipPosts';
import PostList from './pages/company/PostList';
import ApplicationsDashboard from './pages/company/ApplicationsDashboard';
import Interns from './pages/company/Interns';
import InternProfile from './pages/company/InternProfile';
import StudentEvaluation from './pages/company/StudentEvaluation';
import ReportDownload from './pages/company/ReportDownload';
import Login from './pages/Login';
import SuggestedCompanies from './Mohamed/components/SuggestedCompanies';
import UploadDocs from './pages/company/UploadDocs';
import Notifications from './pages/company/Notifications';
import ApplicationAlerts from './pages/company/ApplicationAlerts';
import CourseList from './Mohamed/components/CourseList';
import SubmitFinalReport from './Mohamed/components/SubmitFinalReport';
import NotificationM from './Mohamed/components/Notification';
import StudentDashboard from './Mohamed/components/StudentDashboard'; // New Dashboard component
import CompanyDetail from './Mohamed/components/CompanyDetail';
import ApplicationsList from './Mohamed/components/ApplicationsList';
import InternshipsForStudent from './Mohamed/components/InternshipsForStudent';
import ProStudentExtras from './youssef/ProStudentExtras';
import Meeting from './youssef/Meeting';
import CompaniesViewed from './youssef/CompaniesViewed';
import OnlineAssessments from './youssef/OnlineAssessments';
import FlaggedReports from './youssef/FlaggedReports'
import WorkshopPage from './youssef/WorkshopPage';
import LiveWorkshopPage from './youssef/LiveWorkShopPage';
import CompletedWorkshops from './youssef/CompletedWorkshops';
import UpcomingWorkshopsPage from './youssef/UpcomingWorkshopsPage';
import WorkshopRecordings from './youssef/WorkshopRecordings';


//faculty member routes
import FaculutyInternshipReports from './FaculutyMember/Pages/FaculutyInternshipReports';
import FaculutyInternshipReportDetails from './FaculutyMember/Pages/FaculutyInternshipReportDetails';
import FaculutyStatistics from './FaculutyMember/Pages/FaculutyStatistics';
//end of faculty member routes






function App() {
  return (
    <Routes>
      {/* SCAD routes */}
      <Route path="/SCAD" element={<Dashboard />} />
      <Route path="SCAD/company/:id" element={<CompanyPage />} />
      <Route path="SCAD/InternshipCycle" element={<InternshipCycle />} />
      <Route path="SCAD/StudentList" element={<StudentList />} />
      <Route path="SCAD/StudentProfilePage" element={<StudentProfilePage />} />
      <Route path="SCAD/internship-reports" element={<InternshipReports />} />
      <Route path="SCAD/internship-reports/:id" element={<InternshipReportDetails />} />
      <Route path="SCAD/evaluation-reports/:id" element={<EvaluationReportDetails />} />
      <Route path="SCAD/Statistics" element={<Statistics />} />
      <Route path="SCAD/RequestAppointment" element={<RequestAppointment />} />
      <Route path="SCAD/AppointmentRequests" element={<AppointmentRequests />} />
      <Route
        path="SCAD/manage"
        element={<ManageAppointments  />}
      />
      <Route
        path="SCAD/call"
        element={<CallInterface  />}
      />
      <Route path="SCAD/notifications" element={<Notification />} />
      {/* end of SCAD routes */}





      {/* Dashboard */}
      <Route path="/Student" element={<StudentDashboard />} />
      {/* Other routes */}
      <Route path="/companies/:id" element={<CompanyDetail />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/majors" element={<MajorsList />} />
      <Route path="/select-major-semester" element={<SelectMajorSemester />} />
      <Route path="/internships" element={<InternshipsList />} />
      <Route path="/internship/:id" element={<InternshipDetails />} />
      <Route path="/applications" element={<ApplicationsList />} />
      <Route path="/applications/:id" element={<ApplicationStatus />} />
      <Route path="internships/apply/:id" element={<ApplyInternship />} />
      <Route path="/suggested-companies" element={<SuggestedCompanies />} />
      <Route path="/past-present-internships" element={<InternshipsForStudent/>} />
      <Route path="/course-list" element={<CourseList />} />
      <Route path="/submit-final-report" element={<SubmitFinalReport />} />




      {/* Company routes */}
      <Route path="/" element={<Login />} />
      
      <Route path="/company/register" element={<RegisterCompany />} />
      <Route path="/company/manage-posts" element={<ManageInternshipPosts />} />
      <Route path="/company/posts" element={<PostList />} />
      <Route path="/company/applications" element={<ApplicationsDashboard />} />
      <Route path="/company/interns" element={<Interns />} />
      <Route path="/company/intern/:id" element={<InternProfile />} />
      <Route path="/company/evaluations" element={<StudentEvaluation />} />
      <Route path="/reports" element={<ReportDownload />} />
      <Route path="/company/upload-docs" element={<UploadDocs />} />
      <Route path="/company/notifications" element={<Notifications />} />
      <Route path="/company/app-alerts" element={<ApplicationAlerts />} />





      
      <Route path="/prostudentextras"  element={<ProStudentExtras />}/>
      <Route path="/flaggedreports"  element={<FlaggedReports />}/>
      <Route path="/meeting" element={<Meeting />}/>
      <Route path="/companiesviewed" element={<CompaniesViewed />}/>
      <Route path="/onlineassessments" element={<OnlineAssessments />}/>
      <Route path="/workshop" element={<WorkshopPage />} />
      <Route path="/workshop/live" element={<LiveWorkshopPage />} />
      <Route path="/workshop/completed" element={<CompletedWorkshops />} />
      <Route path="/workshop/upcoming" element={<UpcomingWorkshopsPage />} />
      <Route path="/workshop/recorded" element={<WorkshopRecordings />} />




      <Route path="/faculty/internship-reports" element={<FaculutyInternshipReports />} />
      <Route path="/faculty/internship-reports/:id" element={<FaculutyInternshipReportDetails />} />
      <Route path="/faculty/statistics" element={<FaculutyStatistics />} />

    </Routes>
   
  );
}
export default App;