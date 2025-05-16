import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const sampleInternships = [
  { id: 1, title: 'Frontend Intern', company: 'Google', field: 'Tech', location: 'Remote', description: 'Work with React and UI team' },
  { id: 2, title: 'Pharma Research Intern', company: 'Pfizer', field: 'Pharma', location: 'Cairo', description: 'Research lab-based tasks' },
  { id: 3, title: 'Business Analyst Intern', company: 'Dell', field: 'Business', location: 'Remote', description: 'Analyze market trends' },
  { id: 4, title: 'AI Intern', company: 'OpenAI', field: 'Tech', location: 'Cairo', description: 'ML model experimentation' },
];

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = sampleInternships.find((i) => i.id === parseInt(id));

  const handleApply = () => {
    console.log('Applied to internship:', internship.title);
    alert('Application submitted!');
    // In real app, send POST request to API
  };

  if (!internship) {
    return <p>Internship not found</p>;
  }

  return (
    <div>
      <h2>{internship.title}</h2>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Location:</strong> {internship.location}</p>
      <p><strong>Field:</strong> {internship.field}</p>
      <p><strong>Description:</strong> {internship.description}</p>
      <button onClick={handleApply}>Apply Now</button>
      <br />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default InternshipDetails;
