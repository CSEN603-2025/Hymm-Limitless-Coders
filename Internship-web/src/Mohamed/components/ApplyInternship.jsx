
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import internships from '../data/internships';

// const ApplyInternship = () => {
//   const { id } = useParams();
//   const internship = internships.find((i) => i.id.toString() === id);
//   const [statement, setStatement] = useState('');
//   const [file, setFile] = useState(null);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const applications = JSON.parse(localStorage.getItem('applications')) || [];
//     if (internship && applications.some(app => app.id === internship.id)) {
//       setAlreadyApplied(true);
//     }
//   }, [internship]);

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!statement.trim()) {
//       alert('Please enter a motivation statement.');
//       return;
//     }

//     if (!file) {
//       alert('Please upload a document (CV or cover letter).');
//       return;
//     }

//     const applications = JSON.parse(localStorage.getItem('applications')) || [];

//     if (!applications.some(app => app.id === internship.id)) {
//       const newApp = {
//         id: internship.id,
//         title: internship.title,
//         status: 'Pending',
//         statement,
//         fileName: file.name,
//         appliedAt: new Date().toISOString(),
//       };
//       applications.push(newApp);
//       localStorage.setItem('applications', JSON.stringify(applications));
//       alert(`Successfully applied to "${internship.title}".`);
//       setAlreadyApplied(true);
//     } else {
//       alert('You have already applied to this internship.');
//     }

//     setStatement('');
//     setFile(null);
//     navigate('/internships');
//   };

//   if (!internship) return <p>Internship not found.</p>;

//   return (
//     <div>
//       <h3>Apply to: {internship.title}</h3>

//       {alreadyApplied ? (
//         <p style={{ color: 'green' }}>
//           <strong>You have already applied to this internship.</strong>
//         </p>
//       ) : (
//         <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
//           <textarea
//             placeholder="Why are you interested in this internship?"
//             value={statement}
//             onChange={(e) => setStatement(e.target.value)}
//             rows={5}
//             style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
//           />
//           <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
//           <br />
//           <button type="submit" style={{ padding: '10px 15px' }}>
//             Submit Application
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ApplyInternship;












import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import internships from '../data/internships';
import '../css/ApplyInternship.css'; // Create this CSS file

const ApplyInternship = () => {
  const { id } = useParams();
  const internship = internships.find((i) => i.id.toString() === id);
  const [statement, setStatement] = useState('');
  const [file, setFile] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    if (internship && applications.some(app => app.id === internship.id)) {
      setAlreadyApplied(true);
    }
  }, [internship]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!statement.trim()) {
      alert('Please enter a motivation statement.');
      return;
    }

    if (!file) {
      alert('Please upload a document (CV or cover letter).');
      return;
    }

    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    if (!applications.some(app => app.id === internship.id)) {
      const newApp = {
        id: internship.id,
        title: internship.title,
        status: 'Pending',
        statement,
        fileName: file.name,
        appliedAt: new Date().toISOString(),
      };
      applications.push(newApp);
      localStorage.setItem('applications', JSON.stringify(applications));
      alert(`Successfully applied to "${internship.title}".`);
      setAlreadyApplied(true);
    } else {
      alert('You have already applied to this internship.');
    }

    setStatement('');
    setFile(null);
    navigate('/internships');
  };

  if (!internship) return <p className="not-found">Internship not found.</p>;

  return (
    <div className="apply-container">
      <h3 className="apply-title">Apply to: {internship.title}</h3>

      {alreadyApplied ? (
        <p className="already-applied">
          <strong>You have already applied to this internship.</strong>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="apply-form">
          <textarea
            placeholder="Why are you interested in this internship?"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            rows={5}
            className="apply-textarea"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="apply-file"
          />
          <button type="submit" className="apply-button">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyInternship;
