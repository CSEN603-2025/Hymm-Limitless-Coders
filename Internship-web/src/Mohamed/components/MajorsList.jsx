// import React from 'react';
// import majors from '../data/majors';
// import "../css/MajorsList.css";  // External CSS file for styling (recommended)

// const MajorsList = () => (
//   <div className="majors-list-container" style={{ paddingTop: '200px' }}>
//     <h2 className="majors-header">Majors</h2>
//     <ul className="majors-list">
//       {majors.map((m) => (
//         <li key={m.id} className="major-item">
//           <h3>{m.name}</h3>
//           <p><strong>Department:</strong> {m.department}</p>
//           <p><strong>Duration:</strong> {m.duration}</p>
//           <p>{m.description}</p>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default MajorsList;




import React from 'react';
import majors from '../data/majors';
import "../css/MajorsList.css";

const MajorsList = () => (
  <div className="majors-list-container" style={{ paddingTop: '200px' }}>
    <h2 className="majors-header">Majors</h2>
    <ul className="majors-list">
      {majors.map((m) => (
        <li key={m.id} className="major-item">
          <h3>{m.name}</h3>
          <p><strong>Department:</strong> {m.department}</p>
          <p>
            <strong>Semesters:</strong> {m.semesters.join(', ')}
          </p>
          <p>{m.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default MajorsList;
