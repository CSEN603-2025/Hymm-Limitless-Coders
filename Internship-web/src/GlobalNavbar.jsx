import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';




const companyPages = [
  { path: '/company/upload-docs', label: 'Upload Docs' },
  { path: '/company/notifications', label: 'Notifications' },
  { path: '/company/manage-posts', label: 'Internship Post' },
  { path: '/company/app-alerts', label: 'Notification(s)' },
  { path: '/company/posts', label: 'Posts' },
  { path: '/company/applications', label: 'Applications' },
  { path: '/company/interns', label: 'Interns Profile' },
  { path: '/company/evaluations', label: 'Evaluate Student' },
  { path: '/reports', label: 'Download PDF Report' }
];

const SCADPages = [
  { path: '/SCAD', label: 'Dashboard' },
  { path: '/SCAD/InternshipCycle', label: 'Internship Cycle' },
  { path: '/SCAD/StudentList', label: 'Student List' },
  { path: '/SCAD/internship-reports', label: 'Internship Reports' },
  { path: '/SCAD/Statistics', label: 'Statistics' },
  { path: '/SCAD/RequestAppointment', label: 'Request Appointment' },
  { path: '/SCAD/manage', label: 'Manage Appointments' },
  { path: '/SCAD/call', label: 'Call Interface' },
  { path: '/internships', label: 'Internships' },
  { path: '/SCAD/notifications', label: 'Notifications' }
];

const StudentPages = [
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

const facultyPages = [
  { path: '/faculty/internship-reports', label: 'Internship Reports' },
  { path: '/faculty/statistics', label: 'Statistics' },
  
];

const ProStudentPages = [
  ...StudentPages,
  { path: '/prostudentextras', label: 'Pro Student Dashboard' }
];

function GlobalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [role, setRole] = useState('');
  const [notificationCount, setNotificationCount] = useState(1);
  const [theme, setTheme] = useState('light');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();



  const handleNotificationClick = () => {
  setNotificationCount(0);
};


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole.toLowerCase());
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Check if we need to show scroll arrows
  useEffect(() => {
    const checkScrollPosition = () => {
      if (menuRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    // Initial check
    checkScrollPosition();

    // Add event listener for checking when scrolling happens
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('scroll', checkScrollPosition);
      return () => menuElement.removeEventListener('scroll', checkScrollPosition);
    }
  }, [role]);

  const pages = useMemo(() => {
    switch (role) {
      case 'company':
        return companyPages;
      case 'scad':
        return SCADPages;
      case 'prostudent':
        return ProStudentPages;
      case 'student':
        return StudentPages;
      default:
        return [];
    }
  }, [role]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('appointments');
    // Add any other items that need to be cleared
    
    // Redirect to login page
    navigate('/');
  };

  const scrollMenu = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 200; // Adjust as needed
      const currentScroll = menuRef.current.scrollLeft;
      menuRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-brand">
        <span>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</span>
      </div>
      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
      
      <div className="navbar-scroll-container">
        {showLeftArrow && (
          <button 
            className="navbar-scroll-arrow navbar-scroll-left" 
            onClick={() => scrollMenu('left')}
            aria-label="Scroll menu left"
          >
            ◀
          </button>
        )}
        
        <ul 
          ref={menuRef}
          className={`navbar-menu ${isMenuOpen ? 'navbar-menu-open' : ''}`}
        >
          {pages.map((page, index) => (
            <li key={index}>
              <NavLink
                to={page.path}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={() => {
  setIsMenuOpen(false);
  if (page.label === 'Notifications') {
    handleNotificationClick();
  }
}}

                aria-label={`Navigate to ${page.label}`}

                
              >
                <div className="notification-container">
                  {page.label === 'Notifications' ? (
  <span className="notification-bell-container">
    <svg
      className="notification-bell"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
        fill="currentColor"
      />
    </svg>
    {notificationCount > 0 && (
      <span className="notification-badge">{notificationCount}</span>
    )}
  </span>
) : (
  page.label
)}

                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {showRightArrow && (
          <button 
            className="navbar-scroll-arrow navbar-scroll-right" 
            onClick={() => {
  setIsMenuOpen(false);
  if (page.label === 'Notifications') {
    handleNotificationClick();
  }
}}

            aria-label="Scroll menu right"
          >
            ▶
          </button>
        )}
      </div>
      
      <div className="navbar-actions">
        <div className="profile-menu">
          <button
            className="profile-toggle"
            onClick={toggleProfile}
            aria-expanded={isProfileOpen}
            aria-label="Toggle profile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {isProfileOpen && (
            <ul className="profile-dropdown">
              <li>
                <button className="profile-option" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default GlobalNavbar;
