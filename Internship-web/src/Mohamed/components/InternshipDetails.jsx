// components/InternshipDetails.js (FR 18, 19)
import React from 'react';
import { useParams } from 'react-router-dom';
import internships from '../data/internships';

const InternshipDetails = () => {
  const { id } = useParams(); 
  const internship = internships.find(i => i.id === parseInt(id));

  if (!internship) {
    return <div>Internship not found.</div>;
  }

  return (
    <div>
      <h2>{internship.title}</h2>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Duration:</strong> {internship.duration}</p>
      <p><strong>Description:</strong> {internship.description}</p>
      <p><strong>Posted Date:</strong> {internship.postedDate}</p>
    </div>
  );
};

export default InternshipDetails;
