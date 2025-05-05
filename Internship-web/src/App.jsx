import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import individual feature components
import EditProfile from './Mohamed/components/EditProfile';
import MajorsList from './Mohamed/components/MajorsList';
import SelectMajorSemester from './Mohamed/components/SelectMajorSemester';
import InternshipsList from './Mohamed/components/InternshipList';
import InternshipDetails from './Mohamed/components/InternshipDetails';
import ApplyInternship from './Mohamed/components/ApplyInternship';
import ApplicationStatus from './Mohamed/components/ApplicationStatus';

import CourseList from './Mohamed/components/CourseList';

import SubmitFinalReport from './Mohamed/components/SubmitFinalReport';
import Notification from './Mohamed/components/Notification';
import StudentDashboard from './Mohamed/components/StudentDashboard'; // New Dashboard component
import CompanyDetail from './Mohamed/components/CompanyDetail';
import ApplicationsList from './Mohamed/components/ApplicationsList';
import InternshipsForStudent from './Mohamed/components/InternshipsForStudent';

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

        
        <Route path="/past-present-internships" element={<InternshipsForStudent/>} />
       
       
        
        <Route path="/course-list" element={<CourseList />} />

       
        <Route path="/submit-final-report" element={<SubmitFinalReport />} />
       
      </Routes>
    
  );
};

export default App;
