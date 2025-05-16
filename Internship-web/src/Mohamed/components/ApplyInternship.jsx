// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import internships from '../data/internships';
// import '../css/ApplyInternship.css'; // Create this CSS file
// const ApplyInternship = () => {
//  const role = localStorage.getItem('role');
//   const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

//   const { id } = useParams();
//   const internship = selectedInternships.find((i) => i.id.toString() === id);
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

//   if (!internship) return <p className="not-found">Internship not found.</p>;

//   return (
//     <div className="apply-container" style={{ paddingTop: '200px' }}>
//       <h3 className="apply-title">Apply to: {internship.title}</h3>

//       {alreadyApplied ? (
//         <p className="already-applied">
//           <strong>You have already applied to this internship.</strong>
//         </p>
//       ) : (
//         <form onSubmit={handleSubmit} className="apply-form">
//           <textarea
//             placeholder="Why are you interested in this internship?"
//             value={statement}
//             onChange={(e) => setStatement(e.target.value)}
//             rows={5}
//             className="apply-textarea"
//           />
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="apply-file"
//           />
//           <button type="submit" className="apply-button">
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
import '../css/ApplyInternship.css';

const ApplyInternship = () => {
  const role = localStorage.getItem('role');
  const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

  const { id } = useParams();
  const internship = selectedInternships.find((i) => i.id.toString() === id);

  const [statement, setStatement] = useState('');
  const [files, setFiles] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    if (internship && applications.some(app => app.id === internship.id)) {
      setAlreadyApplied(true);
    }
  }, [internship]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!statement.trim()) {
      alert('Please enter why you are interested in this internship');
      return;
    }

    if (files.length === 0) {
      alert('Please upload at least one supporting document (CV, cover letter, or certificate) to proceed.');
      return;
    }

    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    if (!applications.some(app => app.id === internship.id)) {
      const newApp = {
        id: internship.id,
        title: internship.title,
        status: 'Pending',
        statement,
        files: files.map(file => file.name),
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
    setFiles([]);
    navigate('/internships');
  };

  if (!internship) return <p className="not-found">Internship not found.</p>;

  return (
    <div className="apply-container" style={{ paddingTop: '200px' }}>
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

          <label htmlFor="fileUpload" className="file-upload-label">
            Upload any extra documents that may showcase your fit for the internship (e.g., certificates, cover letter, CV):
          </label>
          <input
            id="fileUpload"
            type="file"
            onChange={handleFileChange}
            className="apply-file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />

          {files.length > 0 && (
            <ul className="uploaded-files">
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="remove-file-button"
                    aria-label={`Remove file ${file.name}`}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button type="submit" className="apply-button">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyInternship;
