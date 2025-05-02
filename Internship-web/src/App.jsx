import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import individual feature components
import EditProfile from './Mohamed/components/EditProfile';
import MajorsList from './Mohamed/components/MajorsList';
import SelectMajorSemester from './Mohamed/components/SelectMajorSemester';
import InternshipsList from './Mohamed/components/InternshipList';
import InternshipDetails from './Mohamed/components/InternshipDetails';
import ApplyInternship from './Mohamed/components/ApplyInternship';
import UploadDocs from './Mohamed/components/UploadDocument';
import ApplicationStatus from './Mohamed/components/ApplicationStatus';
import PastInternships from './Mohamed/components/PastInternships';
import FilterPastInternships from './Mohamed/components/FilterPastInternships';
import CompanyEvaluation from './Mohamed/components/CompanyEvaluation';
import InternshipReport from './Mohamed/components/InternshipReport';
import CourseList from './Mohamed/components/CourseList';
import SelectHelpfulCourses from './Mohamed/components/SelectHelpfulCourses';
import SubmitFinalReport from './Mohamed/components/SubmitFinalReport';
import Notification from './Mohamed/components/Notification';
import StudentDashboard from './Mohamed/components/StudentDashboard'; // New Dashboard component
import CompanyDetail from './Mohamed/components/CompanyDetail';
import ApplicationsList from './Mohamed/components/ApplicationsList';

const App = () => {
  return (
 
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<StudentDashboard />} />

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
        <Route path="/upload-docs" element={<UploadDocs />} />
        
        <Route path="/past-internships" element={<PastInternships />} />
        <Route path="/filter-past-internships" element={<FilterPastInternships />} />
        <Route path="/company-evaluation" element={<CompanyEvaluation />} />
        <Route path="/internship-report" element={<InternshipReport />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/select-helpful-courses" element={<SelectHelpfulCourses />} />
        <Route path="/submit-final-report" element={<SubmitFinalReport />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    
  );
};

export default App;
