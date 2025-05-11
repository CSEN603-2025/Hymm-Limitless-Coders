import React, { useState, useContext } from 'react';
import { CompanyContext } from '../Context/CompanyContext';
import NaggarRoutes from '../NaggarRoutes';
import { useNavigate } from 'react-router-dom';
import './report.css';

function CompanyJoinList() {
  const { companies } = useContext(CompanyContext);
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  // Get unique industries from companies
  const uniqueIndustries = [...new Set(companies.map(company => company.industry))];

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesIndustry = !industryFilter || company.industry === industryFilter;
    const matchesStatus = !statusFilter || company.status === statusFilter;
    const matchesSearch = !searchQuery || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesIndustry && matchesStatus && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  return (
    <div className="page-container">
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Company Applications</h1>
        </section>

        {/* Filter Section */}
        <section className="filter-section" role="region" aria-labelledby="filter-heading">
          <h2 className="filter-heading" id="filter-heading">Filters</h2>
          <div className="filter-container">
            <div className="filter-group">
              <label className="filter-label" htmlFor="industry-filter">
                Filter by Industry:
                <select
                  id="industry-filter"
                  className="filter-select"
                  value={industryFilter}
                  onChange={e => setIndustryFilter(e.target.value)}
                  aria-label="Filter by Industry"
                >
                  <option value="">All</option>
                  {uniqueIndustries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
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
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>
            </div>

            <div className="filter-group search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or industry..."
                aria-label="Search companies"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Active Filter Tags */}
          <div className="active-filters">
            {industryFilter && (
              <span className="filter-tag">
                Industry: {industryFilter}
                <button
                  className="tag-remove"
                  onClick={() => setIndustryFilter('')}
                  aria-label={`Remove ${industryFilter} filter`}
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

        {/* Companies Grid */}
        <section className="reports-grid" role="region" aria-labelledby="companies-heading">
          <h2 className="reports-heading" id="companies-heading">Companies</h2>
          {currentCompanies.length > 0 ? (
            currentCompanies.map(company => (
              <div key={company.id} className="card report-card" onClick={() => navigate(`/company/${company.id}`)}>
                <div className="card-content">
                  <h3 className="report-name">{company.name}</h3>
                  <div className="report-details">
                    <div className="report-info">
                      <span className="info-label">Industry:</span>
                      {company.industry}
                    </div>
                    <div className="report-info">
                      <span className="info-label">Location:</span>
                      {company.location}
                    </div>
                    <div className="report-info">
                      <span className="info-label">Size:</span>
                      {company.size}
                    </div>
                    <div className="report-info">
                      <span className="info-label">Status:</span>
                      <span className={`status-badge status-${company.status.toLowerCase()}`}>
                        {company.status}
                      </span>
                    </div>
                    <div className="report-info">
                      <span className="info-label">Deadline:</span>
                      {new Date(company.applicationDeadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="btn-primary">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No companies match your current filters.</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setIndustryFilter('');
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
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous page"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${page === currentPage ? 'pagination-btn-active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
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

export default CompanyJoinList;