import React from 'react';
import { Link } from 'react-router-dom';

const companyPages = [
  { path: '/company/register', label: 'Register (M1-1)' },
  { path: '/company/upload-docs', label: 'Upload Docs (M1-2)' },
  { path: '/company/notifications', label: 'Accept/Reject Email (M1-8)' },
  { path: '/company/manage-posts', label: 'CRUD Internship Post (M1-9)' },
  // { path: '/login', label: 'Global Login (M1-10)' },
  { path: '/company/app-alerts', label: 'Notify on New Application (M1-24)' },
  { path: '/company/posts', label: 'Posts List/Search/Filter/Counts (M1-25 to M1-28)' },
  { path: '/company/applications', label: 'View & Manage Applications (M1-29 to M1-32)' },
  { path: '/company/interns', label: 'Interns List/Filters/Profile (M1-33 to M1-37)' },
  { path: '/company/evaluations', label: 'Evaluate Student (M1-38)' },
  { path: '/reports', label: 'Download PDF Report (M1-48)' },
  { path: '/student/notifications', label: 'Student Cycle Notification (M1-50)' },
  { path: '/student/internship-video', label: 'Internship Criteria Video (M1-65)' },
];

const CompanyHome = () => {
  return (
    <main className="dashboard-container">
      <section className="card">
        <h2 className="card-header">Company Dashboard</h2>
        <div className="dashboard-links">
          {companyPages.map((page, index) => (
            <Link to={page.path} key={index} className="nav-link" aria-label={`Go to ${page.label}`}>
              <button className="btn-outline">{page.label}</button>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CompanyHome;
