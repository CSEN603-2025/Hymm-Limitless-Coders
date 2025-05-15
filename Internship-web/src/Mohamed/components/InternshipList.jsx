// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import internships from '../data/internships';
// import "../css/Internships.css";

// const InternshipList = () => {
//   const role = localStorage.getItem('role');
//   const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

//   // searchTerm holds the input value
//   const [searchTerm, setSearchTerm] = useState('');
//   // search holds the actual search value used for filtering
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     setUserRole(role);
//   }, []);

//   // filter based on the actual search state, not the input box value
//   const filteredInternships = selectedInternships.filter(i =>
//     i.title.toLowerCase().includes(search.toLowerCase()) &&
//     (filter ? i.type === filter : true)
//   );

//   const handleView = (intern) => {
//     navigate(`/internship/${intern.id}`);
//   };

//   const handleApply = (intern) => {
//     navigate(`/internships/apply/${intern.id}`);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSearch('');
//     setFilter('');
//   };

//   // When clicking Search button, update the actual search state
//   const handleSearch = () => {
//     setSearch(searchTerm);
//   };

//   const canApply = () => {
//     return userRole === 'student' || userRole === 'prostudent';
//   };

//   return (
//     <div className="internship-list-container" style={{ paddingTop: '200px' }}>
//       <h2 className="internship-list-header">All Internships</h2>

//       {/* Search Input + Buttons */}
//       <div className="search-container">
//         <input
//          style={{ width: '400px' }} // added styling here
//           placeholder="Search internships by title"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           Search
//         </button>
//         <button onClick={clearFilters} className="clear-button">
//           Clear
//         </button>
//       </div>

//       {/* Filter Dropdown */}
//       <div className="filter-container">
//         <select
//           onChange={e => setFilter(e.target.value)}
//           value={filter}
//           className="filter-select"
//         >
//           <option value="">All Types</option>
//           <option value="remote">Remote</option>
//           <option value="onsite">Onsite</option>
//         </select>
//       </div>

//       {/* Internship List */}
//       <ul className="internship-list">
//         {filteredInternships.map(intern => (
//           <li key={intern.id} className="internship-item">
//             <strong>{intern.title}</strong>
//             <p>{intern.description}</p>
//             <div className="internship-buttons">
//               <button onClick={() => handleView(intern)} className="view-button">
//                 View
//               </button>
//               {canApply() && (
//                 <button onClick={() => handleApply(intern)} className="apply-button">
//                   Apply
//                 </button>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InternshipList;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import internships from '../data/internships';
import "../css/Internships.css";

const InternshipList = () => {
  const role = localStorage.getItem('role');
  const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  
  // Filters states
  const [typeFilter, setTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  // Filtering logic combining search and all filters
  const filteredInternships = selectedInternships.filter(i => {
    const matchesSearch =
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter ? i.type === typeFilter : true;
    const matchesIndustry = industryFilter ? i.industry.toLowerCase() === industryFilter.toLowerCase() : true;
    const matchesDuration = durationFilter ? i.duration === durationFilter : true;
    const matchesPaid = paidFilter
      ? paidFilter === 'paid'
        ? i.paid === true
        : i.paid === false
      : true;

    return matchesSearch && matchesType && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleView = (intern) => {
    navigate(`/internship/${intern.id}`);
  };

  const handleApply = (intern) => {
    navigate(`/internships/apply/${intern.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearch('');
    setTypeFilter('');
    setIndustryFilter('');
    setDurationFilter('');
    setPaidFilter('');
  };

  const handleSearch = () => {
    setSearch(searchTerm);
  };

  const canApply = () => {
    return userRole === 'student' || userRole === 'prostudent';
  };

  return (
    <div className="internship-list-container" style={{ paddingTop: '200px' }}>
      <h2 className="internship-list-header">All Internships</h2>

      {/* Search Input + Buttons */}
      <div className="search-container">
        <input
          style={{ width: '400px' }}
          placeholder="Search internships by title or company"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={clearFilters} className="clear-button">
          Clear
        </button>
      </div>

      {/* Filters */}
      <div className="filter-container" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        {/* Type Filter */}
        <select
          onChange={e => setTypeFilter(e.target.value)}
          value={typeFilter}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {/* Industry Filter */}
        <select
          onChange={e => setIndustryFilter(e.target.value)}
          value={industryFilter}
          className="filter-select"
        >
          <option value="">All Industries</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
          <option value="Data Science">Data Science</option>
          <option value="Marketing">Marketing</option>
          {/* Add more industries as needed */}
        </select>

        {/* Duration Filter */}
        <select
          onChange={e => setDurationFilter(e.target.value)}
          value={durationFilter}
          className="filter-select"
        >
          <option value="">All Durations</option>
          <option value="2 months">2 months</option>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="5 months">5 months</option>
          <option value="6 months">6 months</option>
        </select>

        {/* Paid/Unpaid Filter */}
        <select
          onChange={e => setPaidFilter(e.target.value)}
          value={paidFilter}
          className="filter-select"
        >
          <option value="">All Payment Types</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Internship List */}
      <ul className="internship-list" style={{ marginTop: '20px' }}>
        {filteredInternships.length === 0 && (
          <li>No internships found matching the criteria.</li>
        )}
        {filteredInternships.map(intern => (
          <li key={intern.id} className="internship-item">
            <strong>{intern.title}</strong>
            <p><em>{intern.company}</em> - {intern.duration}</p>
            <p>{intern.description}</p>
            <div className="internship-buttons">
              <button onClick={() => handleView(intern)} className="view-button">
                View
              </button>
              {canApply() && (
                <button onClick={() => handleApply(intern)} className="apply-button">
                  Apply
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternshipList;
