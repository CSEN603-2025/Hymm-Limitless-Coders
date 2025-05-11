import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../Components /StudentCard';
import NaggarRoutes from '../NaggarRoutes';
import '../Styles/studentList.css'; // Changed from studentList.css to report.css

// Expanded dummy data
const dummyStudents = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    status: 'Not Started',
    major: 'Computer Science',
    email: 'alice.johnson@university.edu',
    gpa: '3.8',
    semester: 'Fall 2024',
    internshipType: 'Summer Internship'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    status: 'In Progress',
    major: 'Business Administration',
    email: 'bob.smith@university.edu',
    gpa: '3.6',
    semester: 'Spring 2024',
    internshipType: 'Co-op Program'
  },
  { 
    id: 3, 
    name: 'Charlie Lee', 
    status: 'Completed',
    major: 'Engineering',
    email: 'charlie.lee@university.edu',
    gpa: '3.9',
    semester: 'Summer 2024',
    internshipType: 'Research Internship'
  },
  { 
    id: 4, 
    name: 'Diana Martinez', 
    status: 'In Progress',
    major: 'Data Science',
    email: 'diana.martinez@university.edu',
    gpa: '3.7',
    semester: 'Fall 2024',
    internshipType: 'Industry Internship'
  },
  { 
    id: 5, 
    name: 'Ethan Wilson', 
    status: 'Not Started',
    major: 'Computer Science',
    email: 'ethan.wilson@university.edu',
    gpa: '3.5',
    semester: 'Spring 2024',
    internshipType: 'Summer Internship'
  },
  { 
    id: 6, 
    name: 'Fiona Chen', 
    status: 'Completed',
    major: 'Business Analytics',
    email: 'fiona.chen@university.edu',
    gpa: '3.9',
    semester: 'Summer 2024',
    internshipType: 'Co-op Program'
  },
  { 
    id: 7, 
    name: 'George Brown', 
    status: 'In Progress',
    major: 'Engineering',
    email: 'george.brown@university.edu',
    gpa: '3.6',
    semester: 'Fall 2024',
    internshipType: 'Research Internship'
  },
  { 
    id: 8, 
    name: 'Hannah Davis', 
    status: 'Not Started',
    major: 'Computer Science',
    email: 'hannah.davis@university.edu',
    gpa: '3.8',
    semester: 'Spring 2024',
    internshipType: 'Industry Internship'
  }
];

function StudentList() {
  const [majorFilter, setMajorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const studentsPerPage = 10;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get unique majors from students
  const uniqueMajors = Array.from(
    new Set(dummyStudents.map(student => student.major))
  ).sort();

  // Filter students with defensive checks
  const filtered = dummyStudents.filter(student => {
    if (!student || typeof student !== 'object') return false;
    const studentName = student.name?.toLowerCase() || '';
    const major = student.major?.toLowerCase() || '';
    const query = debouncedQuery.toLowerCase();
    return (
      (majorFilter === '' || student.major === majorFilter) &&
      (statusFilter === '' || student.status === statusFilter) &&
      (debouncedQuery === '' || 
        studentName.includes(query) || 
        major.includes(query))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / studentsPerPage);
  const paginatedStudents = filtered.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Student List</h1>
        </section>

        {/* Filter Section */}
        <section className="filter-section" role="region" aria-labelledby="filter-heading">
          <h2 className="filter-heading" id="filter-heading">Filters</h2>
          <div className="filter-container">
            <div className="filter-group">
              <label className="filter-label" htmlFor="major-filter">
                Filter by Major:
                <select
                  id="major-filter"
                  className="filter-select"
                  value={majorFilter}
                  onChange={e => setMajorFilter(e.target.value)}
                  aria-label="Filter by Major"
                >
                  <option value="">All</option>
                  {uniqueMajors.map(major => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="status-filter">
                Filter by Status:
                <select
                  id="status-filter"
                  className="filter-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  aria-label="Filter by Status"
                >
                  <option value="">All</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </div>

            <div className="filter-group search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or major..."
                aria-label="Search students"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Active Filter Tags */}
          <div className="active-filters">
            {majorFilter && (
              <span className="filter-tag">
                Major: {majorFilter}
                <button
                  className="tag-remove"
                  onClick={() => setMajorFilter('')}
                  aria-label={`Remove ${majorFilter} filter`}
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="filter-tag">
                Status: {statusFilter}
                <button
                  className="tag-remove"
                  onClick={() => setStatusFilter('')}
                  aria-label={`Remove ${statusFilter} filter`}
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="filter-tag">
                Search: {searchQuery}
                <button
                  className="tag-remove"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search query"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </section>

        {/* Students Grid */}
        <section className="reports-grid" role="region" aria-labelledby="students-heading">
          <h2 className="reports-heading" id="students-heading">Students</h2>
          {paginatedStudents.length > 0 ? (
            paginatedStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onClick={() => navigate(`/student/${student.id}`)}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No students match your current filters.</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setMajorFilter('');
                  setStatusFilter('');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="pagination-section">
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${page === currentPage ? 'pagination-btn-active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default StudentList;