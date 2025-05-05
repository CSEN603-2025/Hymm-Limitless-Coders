// import { useState } from 'react';
// import pastAndPresentIntership from '../data/PastAndPresentInternships';

// const InternshipsForStudent = () => {
//   const [searchInput, setSearchInput] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [expandedId, setExpandedId] = useState(null);
//   const [filteredInternships, setFilteredInternships] = useState(pastAndPresentIntership);

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//   };

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handleSearchClick = () => {
//     const results = pastAndPresentIntership.filter((internship) => {
//       const matchesSearch = internship.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
//                             internship.company?.toLowerCase().includes(searchInput.toLowerCase());

//       const normalizedStatus = internship.status?.toLowerCase().trim() || 'unknown';
//       const matchesFilter = statusFilter === 'all' || normalizedStatus === statusFilter;

//       return matchesSearch && matchesFilter;
//     });
//     setFilteredInternships(results);
//   };

//   const handleClear = () => {
//     setSearchInput('');
//     setStatusFilter('all');
//     setFilteredInternships(pastAndPresentIntership);
//   };

//   return (
//     <div>
//       <h3>Past and Present Internships</h3>

//       {/* Search and Filter */}
//       <div style={{ marginBottom: '1rem' }}>
//         <input 
//           type="text" 
//           placeholder="Search by title or company..." 
//           value={searchInput} 
//           onChange={handleSearchInputChange} 
//           style={{ padding: '5px', marginRight: '10px' }}
//         />
//         <select value={statusFilter} onChange={handleFilterChange} style={{ padding: '5px', marginRight: '10px' }}>
//           <option value="all">All</option>
//           <option value="completed">Completed</option>
//           <option value="in-progress">In Progress</option>
//         </select>
//         <button onClick={handleSearchClick} style={{ padding: '5px 10px', marginRight: '5px' }}>Search</button>
//         <button onClick={handleClear} style={{ padding: '5px 10px' }}>Clear</button>
//       </div>

//       {/* List Internships */}
//       <ul>
//         {filteredInternships.length === 0 ? (
//           <p>No internships found.</p>
//         ) : (
//           filteredInternships.map((internship) => (
//             <li 
//               key={internship.id} 
//               onClick={() => toggleExpand(internship.id)}
//               style={{ 
//                 marginBottom: '10px', 
//                 cursor: 'pointer', 
//                 border: '1px solid #ccc', 
//                 padding: '10px', 
//                 borderRadius: '5px' 
//               }}
//             >
//               <strong>{internship.title}</strong> — {internship.status}
//               {expandedId === internship.id && (
//                 <div style={{ marginTop: '10px' }}>
//                   <p><strong>Company:</strong> {internship.company}</p>
//                   <p><strong>Description:</strong> {internship.description}</p>
//                   <p><strong>Duration:</strong> {internship.duration}</p>
//                   <p><strong>Location:</strong> {internship.location}</p>
//                   <p><strong>Posted Date:</strong> {internship.postedDate}</p>
//                 </div>
//               )}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default InternshipsForStudent;






import { useState, useEffect } from 'react';
import pastAndPresentIntership from '../data/PastAndPresentInternships';

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

  return (
    <div>
      <h3>Past and Present Internships</h3>

      {/* Search and Filter */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
        <button onClick={handleSearchClick} style={{ padding: '5px 10px', marginRight: '5px' }}>
          Search
        </button>
        <button onClick={handleClear} style={{ padding: '5px 10px' }}>
          Clear
        </button>
      </div>

      {/* List Internships */}
      <ul>
        {filteredInternships.length === 0 ? (
          <p>No internships found.</p>
        ) : (
          filteredInternships.map((internship) => (
            <li
              key={internship.id}
              onClick={() => toggleExpand(internship.id)}
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <strong>{internship.title}</strong> — {internship.status}
              {expandedId === internship.id && (
                <div
                  style={{ marginTop: '10px' }}
                  onClick={(e) => e.stopPropagation()} // Prevent collapse on inner clicks
                >
                  <p><strong>Company:</strong> {internship.company}</p>
                  <p><strong>Description:</strong> {internship.description}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                  <p><strong>Location:</strong> {internship.location}</p>
                  <p><strong>Posted Date:</strong> {internship.postedDate}</p>

                  {internship.status?.toLowerCase() === 'completed' && (
                    <div
                      style={{
                        marginTop: '10px',
                        borderTop: '1px solid #ccc',
                        paddingTop: '10px',
                      }}
                    >
                      <h4>Internship Report</h4>
                      <input
                        type="text"
                        placeholder="Title"
                        value={reports[internship.id]?.title || ''}
                        onChange={(e) => handleReportChange(internship.id, 'title', e.target.value)}
                        style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <textarea
                        placeholder="Introduction"
                        value={reports[internship.id]?.intro || ''}
                        onChange={(e) => handleReportChange(internship.id, 'intro', e.target.value)}
                        rows={2}
                        style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <textarea
                        placeholder="Body"
                        value={reports[internship.id]?.body || ''}
                        onChange={(e) => handleReportChange(internship.id, 'body', e.target.value)}
                        rows={4}
                        style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteReport(internship.id);
                        }}
                        style={{ marginTop: '5px' }}
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
