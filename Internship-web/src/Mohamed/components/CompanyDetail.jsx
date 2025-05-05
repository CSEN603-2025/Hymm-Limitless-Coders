// // components/CompanyDetail.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import companies from '../data/companies';

// const CompanyDetail = () => {
//   const { id } = useParams();
//   const company = companies.find(c => c.id === parseInt(id));

//   if (!company) {
//     return <div>Company not found.</div>;
//   }

//   return (
//     <div>
//       <h2>{company.name}</h2>
//       <p><strong>Industry:</strong> {company.industry}</p>
//       <p><strong>Location:</strong> {company.location}</p>
//       <p><strong>Founded:</strong> {company.founded}</p>
//       <p><strong>Employees:</strong> {company.employees}</p>
//       <p>
//         <strong>Website:</strong>{' '}
//         <a href={company.website} target="_blank" rel="noopener noreferrer">
//           {company.website}
//         </a>
//       </p>
//     </div>
//   );
// };

// export default CompanyDetail;






















import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import companies from '../data/companies';

const LOCAL_STORAGE_KEY = 'companyEvaluations';

const CompanyDetail = () => {
  const { id } = useParams();
  const company = companies.find(c => c.id === parseInt(id));
  const companyId = company?.id;

  const [evaluations, setEvaluations] = useState({});
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);

  // Load evaluations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setEvaluations(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever evaluations change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(evaluations));
  }, [evaluations]);

  const currentEvaluation = evaluations[companyId] || '';

  const handleSubmit = () => {
    if (!text.trim()) return;

    setEvaluations(prev => ({
      ...prev,
      [companyId]: text.trim()
    }));
    setEditing(false);
    setText('');
  };

  const handleEdit = () => {
    setText(currentEvaluation);
    setEditing(true);
  };

  const handleDelete = () => {
    const { [companyId]: _, ...rest } = evaluations;
    setEvaluations(rest);
    setText('');
    setEditing(false);
  };

  if (!company) return <div>Company not found.</div>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Location:</strong> {company.location}</p>
      <p><strong>Founded:</strong> {company.founded}</p>
      <p><strong>Employees:</strong> {company.employees}</p>
      <p>
        <strong>Website:</strong>{' '}
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          {company.website}
        </a>
      </p>

      <hr />
      <h3>Evaluation</h3>

      {currentEvaluation && !editing ? (
        <>
          <p>{currentEvaluation}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '8px' }}>Delete</button>
        </>
      ) : (
        <>
          <textarea
            rows={4}
            placeholder="Write your evaluation..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', marginBottom: '8px' }}
          />
          <br />
          <button onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</button>
        </>
      )}
    </div>
  );
};

export default CompanyDetail;

