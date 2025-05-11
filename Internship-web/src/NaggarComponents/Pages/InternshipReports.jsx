import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportCard from '../Components /ReportCard';
import { useReports } from '../Context/ReportContext';
import NaggarRoutes from '../NaggarRoutes';
import '../Styles/internDetails.css';

function InternshipReports() {
  const { reports } = useReports();
  const [majorFilter, setMajorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const reportsPerPage = 10;

  // Keep the debounce for search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get unique majors from reports
  const uniqueMajors = Array.from(
    new Set(
      reports
        .filter(r => r && typeof r === 'object' && r.major && typeof r.major === 'string')
        .map(r => r.major)
    )
  ).sort(); // Sort for consistent display

  // Filter reports with defensive checks
  const filtered = reports.filter(r => {
    if (!r || typeof r !== 'object') return false; // Skip null or non-object reports
    const studentName = r.studentName && typeof r.studentName === 'string' ? r.studentName.toLowerCase() : '';
    const content = r.content && typeof r.content === 'string' ? r.content.toLowerCase() : '';
    const query = debouncedQuery.toLowerCase();
    return (
      (majorFilter === '' || r.major === majorFilter) &&
      (statusFilter === '' || r.status === statusFilter) &&
      (debouncedQuery === '' || studentName.includes(query) || content.includes(query))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / reportsPerPage);
  const paginatedReports = filtered.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  // Generate search suggestions (top 5 unique matches)
  const suggestions = debouncedQuery
    ? Array.from(
        new Set(
          filtered
            .filter(r => {
              const studentName = r.studentName && typeof r.studentName === 'string' ? r.studentName.toLowerCase() : '';
              return studentName.includes(debouncedQuery.toLowerCase());
            })
            .map(r => r.studentName)
        )
      ).slice(0, 5)
    : [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setDebouncedQuery(suggestion);
  };

  return (
    <div className="page-container">
      {/* Navigation */}
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Internship Reports</h1>
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
                  <option value="Pending">Pending</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </label>
            </div>

            {/* Search Input with Suggestions */}
            <div className="filter-group search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or content..."
                aria-label="Search reports by student name or content"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {suggestions.length > 0 && debouncedQuery && (
                <div className="search-suggestions" role="listbox" aria-label="Search suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="search-suggestion-item"
                      role="option"
                      tabIndex={0}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSuggestionClick(suggestion);
                        }
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
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
                  title="Remove major filter"
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
                  title="Remove status filter"
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
                  aria-label={`Remove search query filter`}
                  title="Remove search filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </section>

        {/* Reports Grid */}
        <section className="reports-grid" role="region" aria-labelledby="reports-heading">
          <h2 className="reports-heading" id="reports-heading">Reports</h2>
          {paginatedReports.length > 0 ? (
            paginatedReports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => navigate(`/internship-reports/${report.id}`)}
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No reports match your current filters.</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setMajorFilter('');
                  setStatusFilter('');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                aria-label="Clear all filters and reset pagination"
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

export default InternshipReports;