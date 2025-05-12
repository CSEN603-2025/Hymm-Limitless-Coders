import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../NaggarComponents/Styles/navbar.css'; // Make sure this exists and is styled like NaggarRoutes

const companyPages = [
  { path: '/faculty/internship-reports', label: 'Internship Reports' },
  { path: '/faculty/statistics', label: 'Statistics' }  
];

function FaculutyRoutes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Company Navigation">
      <div className="navbar-brand">
        <span className="navbar-logo"></span> Faculty Dashboard
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

export default FaculutyRoutes;