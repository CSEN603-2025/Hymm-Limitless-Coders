import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../NaggarComponents/Styles/navbar.css'; // Make sure this exists and is styled like NaggarRoutes

const companyPages = [
  
  { path: '/Student', label: 'Dashboard' },
  { path: '/suggested-companies', label: 'Suggested Companies' },
  { path: '/edit-profile', label: 'Edit Profile' },
  { path: '/majors', label: 'Majors' },
  { path: '/internships', label: 'Internships' },
  { path: '/past-present-internships', label: 'Past & Present Internships' },
  { path: '/applications', label: 'Applications' },
  { path: '/course-list', label: 'Courses' },
  { path: '/submit-final-report', label: 'Submit Final Report' }
];

function CompanyHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Company Navigation">
      <div className="navbar-brand">
        <span className="navbar-logo"></span> Student Dashboard
      </div>
      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="navbar-toggle-icon">☰</span>
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? 'navbar-menu-open' : ''}`}>
        {companyPages.map((page, index) => (
          <li key={index}>
            <NavLink
              to={page.path}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              aria-label={`Go to ${page.label}`}
            >
              {page.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CompanyHome;