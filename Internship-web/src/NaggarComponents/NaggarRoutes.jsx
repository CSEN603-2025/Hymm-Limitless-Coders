import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

function NaggarRoutes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5); // Dummy value for unread notifications

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <span className="navbar-logo">📚</span> Internship Hub
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
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/RequestAppointment"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Request Appointment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Manage Appointments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/call"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Call Interface
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/InternshipCycle"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Internship Cycle
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/StudentList"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Student List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/internship-reports"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Internship Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Statistics"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
            aria-label={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
          >
            <div className="notification-container">
              <FontAwesomeIcon icon={faBell} />
              {notificationCount > 0 && (
                <span className="notification-badge">{notificationCount}</span>
              )}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NaggarRoutes;