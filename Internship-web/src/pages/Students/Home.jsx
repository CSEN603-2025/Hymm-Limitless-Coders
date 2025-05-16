import React from 'react';
import { Link } from 'react-router-dom';

const pages = [
  { path: '/suggested-companies', label: 'Suggested Companies (M2-11)' },
  { path: '/edit-profile', label: 'Edit Profile (M2-12)' },
  { path: '/majors', label: 'View Majors (M2-13)' },
  { path: '/select-major-semester', label: 'Select Major & Semester (M2-14)' },
  { path: '/internships', label: 'Internships List/Search/Filter (M2-15 to M2-17)' },
  { path: '/internship-history', label: 'Past/Present Internships (M2-39 to M2-42)' },
  { path: '/evaluation-report', label: 'Evaluation & Report (M2-43 to M2-44)' },
  { path: '/my-applications', label: 'Applications + Upload Docs (M2-21 to M2-23)' },
  { path: '/final-report', label: 'Final Report + Appeal (M2-45 to M2-47, M2-59, M2-61)' },
];

const Home = () => {
  return (
    <div>
      <h2>Student Dashboard Navigation</h2>
      {pages.map((page, index) => (
        <div key={index} style={{ margin: '10px 0' }}>
          <Link to={page.path}>
            <button>{page.label}</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
