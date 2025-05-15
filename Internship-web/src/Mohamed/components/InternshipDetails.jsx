import React from 'react';
import { useParams } from 'react-router-dom';
import internships from '../data/internships';
import "../css/InternshipDetails.css"; // Be sure to create this file
const InternshipDetails = () => {
const role = localStorage.getItem('role');
  const selectedInternships = role === 'prostudent' ? internships.pro : internships.regular;

  const { id } = useParams(); 
  const internship = selectedInternships.find(i => i.id === parseInt(id));

  if (!internship) {
    return <div className="internship-not-found">Internship not found.</div>;
  }

  return (
    <div className="internship-details-container" style={{ paddingTop: '200px' }}>
      <h2 className="internship-title">{internship.title}</h2>
      <div className="internship-info">
        <p><strong>Company:</strong> {internship.company}</p>
        <p><strong>Location:</strong> {internship.location}</p>
        <p><strong>Duration:</strong> {internship.duration}</p>
        <p><strong>Posted Date:</strong> {internship.postedDate}</p>
        <p className="internship-description">{internship.description}</p>
      </div>
    </div>
  );
};

export default InternshipDetails;
