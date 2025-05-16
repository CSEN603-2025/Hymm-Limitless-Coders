import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const sampleInternships = [
  { id: 1, title: 'Frontend Intern', company: 'Google', field: 'Tech', location: 'Remote' },
  { id: 2, title: 'Pharma Research Intern', company: 'Pfizer', field: 'Pharma', location: 'Cairo' },
  { id: 3, title: 'Business Analyst Intern', company: 'Dell', field: 'Business', location: 'Remote' },
  { id: 4, title: 'AI Intern', company: 'OpenAI', field: 'Tech', location: 'Cairo' },
];

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('');

  useEffect(() => {
    setInternships(sampleInternships); // Simulated fetch
  }, []);

  const filtered = internships.filter((intern) => {
    const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = filterField ? intern.field === filterField : true;
    return matchesSearch && matchesField;
  });

  return (
    <div>
      <h2>Available Internships</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterField} onChange={(e) => setFilterField(e.target.value)}>
        <option value="">All Fields</option>
        <option value="Tech">Tech</option>
        <option value="Pharma">Pharma</option>
        <option value="Business">Business</option>
      </select>

      <ul>
        {filtered.map((internship) => (
          <li key={internship.id}>
            <strong>{internship.title}</strong> at {internship.company} – {internship.field} ({internship.location})
            <Link to={`/internships/${internship.id}`}>
    <strong>{internship.title}</strong> at {internship.company}
  </Link>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default Internships;
