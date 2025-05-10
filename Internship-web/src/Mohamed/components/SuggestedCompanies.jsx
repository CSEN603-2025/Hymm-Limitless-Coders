// // components/SuggestedCompanies.js (FR 11)
// import React from 'react';
// import { Link } from 'react-router-dom';
// import companies from '../data/companies';

// const SuggestedCompanies = () => (
//   <div>
//     <h2>Suggested Companies</h2>
//     <ul>
//       {companies.map((c) => (
//         <li key={c.id}>
//           <Link to={`/companies/${c.id}`}>{c.name}</Link>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default SuggestedCompanies;







import React from 'react';
import { Link } from 'react-router-dom';
import companies from '../data/companies';
import '../css/SuggestedCompanies.css'; // 👈 Import the new CSS

const SuggestedCompanies = () => (
  <div className="dashboard-section">
    <h3 className="section-title">Suggested Companies</h3>
    <ul className="company-list">
      {companies.map((c) => (
        <li key={c.id} className="company-item">
          <Link to={`/companies/${c.id}`} className="company-link">
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SuggestedCompanies;
