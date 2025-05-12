// import React from 'react';
// import { Link } from 'react-router-dom';
// import SuggestedCompanies from './SuggestedCompanies';
// import SelectMajorSemester from './SelectMajorSemester';
// import ApplicationsList from './ApplicationsList';
// import CourseList from './CourseList';
// import "../css/studentDashboard.css"


// const StudentDashboard = () => {
//   return (
//     <div>
//       <h1>Welcome to Your Dashboard</h1>


//        <SelectMajorSemester />



//         <SuggestedCompanies />

      


//       <div>
//         <h3>Your Profile</h3>
//         <Link to="/edit-profile">Edit Profile</Link>
//       </div>


//       <div>
//         <h3>Majors</h3>
//         <Link to="/majors">Majors</Link>
//       </div>



//       <div style={{display:"flex",flexDirection:"column"}}>
//         <h3>Internships</h3>
//         <Link to="/internships">View Available Internships</Link>
//         <Link to="/past-present-internships">View your past and present Internships</Link>
//       </div>

//       <div>
//       <h3>Applications</h3>
//         <ApplicationsList/> 
//       </div>


//       <div>
//       <h3>Courses</h3>
//       <Link to="/course-list">View courses</Link>
//       </div>


//       <div>
//       <h3>Final Report</h3>
//       <Link to="/submit-final-report">View Report</Link>
//       </div>

//       {/*
      

//       <div>
//         <h3>Reports</h3>
//         <Link to="/internship-report">Manage Internship Report</Link>
//         <Link to="/submit-final-report">Submit Final Report</Link>
//       </div>

//       <div>
//         <h3>Notifications</h3>
//         <Link to="/notification">View Notifications</Link>
//       </div> */}
//     </div>
//   );
// };

// export default StudentDashboard;














// import React from 'react';
// import { Link } from 'react-router-dom';
// import SuggestedCompanies from './SuggestedCompanies';
// import SelectMajorSemester from './SelectMajorSemester';
// import ApplicationsList from './ApplicationsList';
// import CourseList from './CourseList';
// import '../css/StudentDashboard.css'; // 👈 Import the CSS file

// const StudentDashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Welcome to Your Dashboard</h1>

//       <SelectMajorSemester />

//       <SuggestedCompanies />

//       <div className="dashboard-section">
//         <h3>Your Profile</h3>
//         <Link to="/edit-profile" className="dashboard-link">Edit Profile</Link>
//       </div>

//       <div className="dashboard-section">
//         <h3>Majors</h3>
//         <Link to="/majors" className="dashboard-link">Majors</Link>
//       </div>

//       <div className="dashboard-section">
//         <h3>Internships</h3>
//         <Link to="/internships" className="dashboard-link">View Available Internships</Link>
//         <Link to="/past-present-internships" className="dashboard-link">View your past and present Internships</Link>
//       </div>

//       <div className="dashboard-section">
//         <h3>Applications</h3>
//         <ApplicationsList />
//       </div>

//       <div className="dashboard-section">
//         <h3>Courses</h3>
//         <Link to="/course-list" className="dashboard-link">View courses</Link>
//       </div>

//       <div className="dashboard-section">
//         <h3>Final Report</h3>
//         <Link to="/submit-final-report" className="dashboard-link">View Report</Link>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;



import React from 'react';
import { Link } from 'react-router-dom';
import SuggestedCompanies from './SuggestedCompanies';
import SelectMajorSemester from './SelectMajorSemester';
import ApplicationsList from './ApplicationsList';
import CourseList from './CourseList';
import Navbar from './Navbar';
import '../css/StudentDashboard.css'; // Updated path to new styles file

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>

      <div className="dashboard-section card">
        <SelectMajorSemester />
      </div>
    </div>
  );
};

export default StudentDashboard;  