// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import companies from '../data/companies';
// import "../css/CompanyDetail.css";
// const LOCAL_STORAGE_KEY = 'companyEvaluations';

// const CompanyDetail = () => {
//   const { id } = useParams();
//   const company = companies.find(c => c.id === parseInt(id));
//   const companyId = company?.id;

//   const [evaluations, setEvaluations] = useState({});
//   const [text, setText] = useState('');
//   const [editing, setEditing] = useState(false);

//   // Load evaluations from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (stored) {
//       setEvaluations(JSON.parse(stored));
//     }
//   }, []);

//   // Save to localStorage whenever evaluations change
//   // useEffect(() => {
//   //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(evaluations));
//   // }, []);

//   const currentEvaluation = evaluations[companyId] || '';

//   const handleSubmit = () => {
//     if (!text.trim()) return;

//     setEvaluations(prev => ({
//       ...prev,
//       [companyId]: text.trim()
//     }));

//   let storedItem={...evaluations,[companyId]: text.trim()}

//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedItem));
//     setEditing(false);
//     setText('');
//   };

//   const handleEdit = () => {
//     setText(currentEvaluation);


    
//     setEditing(true);
//   };

//   const handleDelete = () => {
//     const { [companyId]: _, ...rest } = evaluations;
//     setEvaluations(rest);
//     setText('');
//     setEditing(false);
//   };

//   if (!company) return <div>Company not found.</div>;

//   return (
//     <div className="company-detail-container" style={{ paddingTop: '200px' }}>
//       <h2>{company.name}</h2>
//       <div className="company-info">
//         <p><strong>Industry:</strong> {company.industry}</p>
//         <p><strong>Location:</strong> {company.location}</p>
//         <p><strong>Founded:</strong> {company.founded}</p>
//         <p><strong>Employees:</strong> {company.employees}</p>
//         <p>
//           <strong>Website:</strong>{' '}
//           <a href={company.website} target="_blank" rel="noopener noreferrer">
//             {company.website}
//           </a>
//         </p>
//       </div>

//       <hr />
//       <div className="evaluation-section">
//         <h3>Evaluation</h3>

//         {currentEvaluation && !editing ? (
//           <>
//             <p>{currentEvaluation}</p>
//             <button onClick={handleEdit}>Edit</button>
//             <button onClick={handleDelete} className="delete-btn" style={{ marginLeft: '8px' }}>
//               Delete
//             </button>
//           </>
//         ) : (
//           <>
//             <textarea
//               rows={4}
//               placeholder="Write your evaluation..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <br />
//             <button onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyDetail;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import companies from '../data/companies';
// import "../css/CompanyDetail.css";

// const LOCAL_STORAGE_KEY = 'companyEvaluations';

// const CompanyDetail = () => {

// const role = localStorage.getItem('role');
//  const selectedCompanies = role === 'prostudent' ? companies.pro : companies.regular;



//   const { id } = useParams();
//   const company = selectedCompanies.find(c => c.id === parseInt(id));
//   const companyId = company?.id;

//   const [evaluations, setEvaluations] = useState({});
//   const [text, setText] = useState('');
//   const [editing, setEditing] = useState(false);

//   // Load evaluations from localStorage on first render
//   useEffect(() => {
//     const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (stored) {
//       setEvaluations(JSON.parse(stored));
//     }
//   }, []);

//   const currentEvaluation = evaluations[companyId] || '';

//   const handleSubmit = () => {
//     if (!text.trim()) return;

//     const updatedEvaluations = {
//       ...evaluations,
//       [companyId]: text.trim()
//     };

//     setEvaluations(updatedEvaluations);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvaluations));

//     setEditing(false);
//     setText('');
//   };

//   const handleEdit = () => {
//     setText(currentEvaluation);
//     setEditing(true);
//   };

//   const handleDelete = () => {
//     const { [companyId]: _, ...rest } = evaluations;
//     setEvaluations(rest);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest));
//     setText('');
//     setEditing(false);
//   };

//   if (!company) return <div>Company not found.</div>;

//   return (
//     <div className="company-detail-container" style={{ paddingTop: '200px' }}>
//       <h2>{company.name}</h2>
//       <div className="company-info">
//         <p><strong>Industry:</strong> {company.industry}</p>
//         <p><strong>Location:</strong> {company.location}</p>
//         <p><strong>Founded:</strong> {company.founded}</p>
//         <p><strong>Employees:</strong> {company.employees}</p>
//         <p>
//           <strong>Website:</strong>{' '}
//           <a href={company.website} target="_blank" rel="noopener noreferrer">
//             {company.website}
//           </a>
//         </p>
//       </div>

//       <hr />
//       <div className="evaluation-section">
//         <h3>Evaluation</h3>

//         {currentEvaluation && !editing ? (
//           <>
//             <p>{currentEvaluation}</p>
//             <button onClick={handleEdit}>Edit</button>
//             <button onClick={handleDelete} className="delete-btn" style={{ marginLeft: '8px' }}>
//               Delete
//             </button>
//           </>
//         ) : (
//           <>
//             <textarea
//               rows={4}
//               placeholder="Write your evaluation..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <br />
//             <button onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyDetail;







import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import companies from '../data/companies';
import "../css/CompanyDetail.css";

const LOCAL_STORAGE_KEY = 'companyEvaluations';

const CompanyDetail = () => {
  const role = localStorage.getItem('role');
  const selectedCompanies = role === 'prostudent' ? companies.pro : companies.regular;
  const { id } = useParams();
  const company = selectedCompanies.find(c => c.id === parseInt(id));
  const companyId = company?.id;

  const [evaluations, setEvaluations] = useState({});
  const [text, setText] = useState('');
  const [recommend, setRecommend] = useState('yes'); // default recommend
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setEvaluations(JSON.parse(stored));
    }
  }, []);

  const currentEvaluation = evaluations[companyId];

  const handleSubmit = () => {
    if (!text.trim()) return;

    const updatedEvaluations = {
      ...evaluations,
      [companyId]: {
        text: text.trim(),
        recommend: recommend === 'yes'
      }
    };

    setEvaluations(updatedEvaluations);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvaluations));

    setEditing(false);
    setText('');
    setRecommend('yes');
  };

  const handleEdit = () => {
    setText(currentEvaluation?.text || '');
    setRecommend(currentEvaluation?.recommend ? 'yes' : 'no');
    setEditing(true);
  };

  const handleDelete = () => {
    const { [companyId]: _, ...rest } = evaluations;
    setEvaluations(rest);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest));
    setText('');
    setEditing(false);
    setRecommend('yes');
  };

  if (!company) return <div>Company not found.</div>;

  return (
    <div className="company-detail-container" style={{ paddingTop: '200px' }}>
      <h2>{company.name}</h2>
      <div className="company-info">
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
      </div>

      <hr />
      <div className="evaluation-section">
        <h3>Evaluation</h3>

        {currentEvaluation && !editing ? (
          <>
            <p><strong>Evaluation:</strong> {currentEvaluation.text}</p>
            <p><strong>Would recommend:</strong> {currentEvaluation.recommend ? 'Yes' : 'No'}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} className="delete-btn" style={{ marginLeft: '8px' }}>
              Delete
            </button>
          </>
        ) : (
          <>
            <textarea
              rows={4}
              placeholder="Write your evaluation..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            <label>
              Do you recommend this company?
              <select value={recommend} onChange={(e) => setRecommend(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <br />
            <button onClick={handleSubmit}>{editing ? 'Update' : 'Submit'}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
