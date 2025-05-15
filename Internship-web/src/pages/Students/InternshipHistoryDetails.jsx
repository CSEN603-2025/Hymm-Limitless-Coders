import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockDetails = {
  1: { summary: 'Developed UI with React at Google.' },
  2: { summary: 'Ongoing AI research internship.' },
  3: { summary: 'Conducted lab research at Pfizer.' },
};

const InternshipHistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = mockDetails[id];

  if (!detail) return <p>No details found.</p>;

  return (
    <div>
      <h2>Internship Details (ID: {id})</h2>
      <p>{detail.summary}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default InternshipHistoryDetails;
