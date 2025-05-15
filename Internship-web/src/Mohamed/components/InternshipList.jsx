// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import internships from '../data/internships';
// import "../css/Internships.css"; // External CSS file for styling (recommended)

// const InternshipList = () => {

// const role = localStorage.getItem('role');
//   const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;


//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check localStorage for user role when component mounts
//     const role = localStorage.getItem('role');
//     setUserRole(role);
//   }, []);

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
//     setSearch('');
//     setFilter('');
//   };

//   // Check if user can apply based on role
//   const canApply = () => {
//     return userRole === 'student' || userRole === 'pro student';
//   };

//   return (
//     <div className="internship-list-container" style={{ paddingTop: '200px' }}>
//       <h2 className="internship-list-header">All Internships</h2>
      
//       {/* Search Input */}
//       <div className="search-container">
//         <input
//           placeholder="Search internships by title"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="search-input"
//         />
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
//               <button
//                 onClick={() => handleView(intern)}
//                 className="view-button"
//               >
//                 View
//               </button>
              
//               {/* Only show Apply button if user role is student or pro student */}
//               {canApply() && (
//                 <button
//                   onClick={() => handleApply(intern)}
//                   className="apply-button"
//                 >
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

  // searchTerm holds the input value
  const [searchTerm, setSearchTerm] = useState('');
  // search holds the actual search value used for filtering
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  // filter based on the actual search state, not the input box value
  const filteredInternships = selectedInternships.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? i.type === filter : true)
  );

  const handleView = (intern) => {
    navigate(`/internship/${intern.id}`);
  };

  const handleApply = (intern) => {
    navigate(`/internships/apply/${intern.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearch('');
    setFilter('');
  };

  // When clicking Search button, update the actual search state
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
         style={{ width: '400px' }} // added styling here
          placeholder="Search internships by title"
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

      {/* Filter Dropdown */}
      <div className="filter-container">
        <select
          onChange={e => setFilter(e.target.value)}
          value={filter}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      {/* Internship List */}
      <ul className="internship-list">
        {filteredInternships.map(intern => (
          <li key={intern.id} className="internship-item">
            <strong>{intern.title}</strong>
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
