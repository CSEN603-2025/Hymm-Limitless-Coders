import { useState, useEffect } from 'react';
import pastAndPresentIntership from '../data/PastAndPresentInternships';
import '../css/InternshipsForStudent.css';
const InternshipsForStudent = () => {
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [filteredInternships, setFilteredInternships] = useState(pastAndPresentIntership);

  const REPORT_STORAGE_KEY = 'internshipReports';
  const [reports, setReports] = useState({});

  useEffect(() => {
    const storedReports = localStorage.getItem(REPORT_STORAGE_KEY);
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSearchClick = () => {
    const results = pastAndPresentIntership.filter((internship) => {
      const matchesSearch =
        internship.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        internship.company?.toLowerCase().includes(searchInput.toLowerCase());

      const normalizedStatus = internship.status?.toLowerCase().trim() || 'unknown';
      const matchesFilter = statusFilter === 'all' || normalizedStatus === statusFilter;

      return matchesSearch && matchesFilter;
    });
    setFilteredInternships(results);
  };

  const handleClear = () => {
    setSearchInput('');
    setStatusFilter('all');
    setFilteredInternships(pastAndPresentIntership);
  };

  const handleReportChange = (id, field, value) => {
    setReports((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleDeleteReport = (id) => {
    const { [id]: _, ...rest } = reports;
    setReports(rest);
  };

  const handleExpandedClick = (e) => {
    e.stopPropagation(); // Prevent the toggleExpand function from being triggered when clicking inside the expanded content
  };

  return (
      <div className="internship-container" style={{ paddingTop: '200px' }}>
      <h3 className="title">Past and Present Internships</h3>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchInput}
          onChange={handleSearchInputChange}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="status-filter"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
        <button onClick={handleSearchClick} className="search-btn">Search</button>
        <button onClick={handleClear} className="clear-btn">Clear</button>
      </div>

      {/* List Internships */}
      <ul className="internship-list">
        {filteredInternships.length === 0 ? (
          <p>No internships found.</p>
        ) : (
          filteredInternships.map((internship) => (
            <li
              key={internship.id}
              className={`internship-item ${expandedId === internship.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(internship.id)}
            >
              <div className="internship-item-header">
                <strong>{internship.title}</strong> — {internship.status}
              </div>
              {expandedId === internship.id && (
                <div className="internship-details" onClick={handleExpandedClick}>
                  <p><strong>Company:</strong> {internship.company}</p>
                  <p><strong>Description:</strong> {internship.description}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                  <p><strong>Location:</strong> {internship.location}</p>
                  <p><strong>Posted Date:</strong> {internship.postedDate}</p>

                  {internship.status?.toLowerCase() === 'completed' && (
                    <div className="report-container">
                      <h4>Internship Report</h4>
                      <input
                        type="text"
                        placeholder="Title"
                        value={reports[internship.id]?.title || ''}
                        onChange={(e) => handleReportChange(internship.id, 'title', e.target.value)}
                        className="report-input"
                      />
                      <textarea
                        placeholder="Introduction"
                        value={reports[internship.id]?.intro || ''}
                        onChange={(e) => handleReportChange(internship.id, 'intro', e.target.value)}
                        className="report-textarea"
                      />
                      <textarea
                        placeholder="Body"
                        value={reports[internship.id]?.body || ''}
                        onChange={(e) => handleReportChange(internship.id, 'body', e.target.value)}
                        className="report-textarea"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteReport(internship.id);
                        }}
                        className="delete-report-btn"
                      >
                        Delete Report
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default InternshipsForStudent;
