
// import React from 'react';
// import { Link } from 'react-router-dom';
// import companies from '../data/companies';
// import '../css/SuggestedCompanies.css'; // 👈 Import the new CSS

// const SuggestedCompanies = () => {
//    const role = localStorage.getItem('role');
//   const selectedCompanies = role === 'prostudent' ? companies.pro : companies.regular;


//   return (
//     <div className="dashboard-section" style={{ paddingTop: '200px' }}>
//       <h3 className="section-title">Suggested Companies</h3>
//       <ul className="company-list">
//         {selectedCompanies.map((c) => (
//           <li key={c.id} className="company-item">
//             <Link to={`/companies/${c.id}`} className="company-link">
//               {c.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SuggestedCompanies;



import { Link } from 'react-router-dom';
import companies from '../data/companies';
import '../css/SuggestedCompanies.css';

const SuggestedCompanies = () => {
  const role = localStorage.getItem('role');
  const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
  const jobInterests = profile.jobInterests || ''; // Keep original case for display
  const jobInterestsLower = jobInterests.toLowerCase();

  // Combine companies based on role
  const selectedCompanies = role === 'prostudent' ? companies.pro : companies.regular;

  // Filter based on job interests
  const filteredCompanies = selectedCompanies.filter((company) =>
    jobInterestsLower.includes(company.industry.toLowerCase()) || company.recommendedFromPastInterns
  );

  return (
    <div className="dashboard-section" style={{ paddingTop: '200px' }}>
      <h3 className="section-title">Suggested Companies</h3>

      {/* Display Job Interests */}
      <div className="job-interests">
        <strong>Your Job Interests:</strong>{' '}
        {jobInterests ? jobInterests : 'Not specified'}
      </div>

      {/* Company List */}
      {/* <ul className="company-list">
        {(filteredCompanies.length > 0 ? filteredCompanies : selectedCompanies).map((c) => (
          <li key={c.id} className="company-item">
            <Link to={`/companies/${c.id}`} className="company-link">
              {c.name}
            </Link>
          </li>
        ))}
      </ul> */}

{/* <ul className="company-list">
  {(filteredCompanies.length > 0 ? filteredCompanies : selectedCompanies).map((c) => (
    <li key={c.id} className="company-item">
      <Link to={`/companies/${c.id}`} className="company-link">
        {c.name}
      </Link>
      {c.recommendedFromPastInterns && (
        <span className="recommended-badge">Recommended From Past interns</span>
      )}
    </li>
  ))}
</ul> */}


<ul className="company-list">
  {filteredCompanies.length > 0 ? (
    filteredCompanies.map((c) => (
      <li key={c.id} className="company-item">
        <Link to={`/companies/${c.id}`} className="company-link">
          {c.name}
        </Link>
        {c.recommendedFromPastInterns && (
          <span className="recommended-badge">Recommended From Past interns</span>
        )}
      </li>
    ))
  ) : (
    <li className="no-results">
      No internships match your interests or are recommended from previous internships.
    </li>
  )}
</ul>






    </div>
  );
};

export default SuggestedCompanies;
