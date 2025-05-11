import React, { useContext } from 'react';
import { CompanyContext } from '../Context/CompanyContext';
import CompanyCard from '../Components /CompanyCard';
import '../Pages/companylist.css';

function CompanyList({ industryFilter, statusFilter, searchQuery }) {
  const { companies } = useContext(CompanyContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (filteredCompanies.length === 0) {
    return (
      <div className="empty-state">
        <p>No companies found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-grid">
        {currentCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-section">
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${currentPage === index + 1 ? 'pagination-btn-active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyList;