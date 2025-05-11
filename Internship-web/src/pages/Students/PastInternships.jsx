import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const internshipHistory = [
  { id: 1, title: 'Frontend Intern', company: 'Google', type: 'Completed', year: '2023' },
  { id: 2, title: 'AI Intern', company: 'OpenAI', type: 'Ongoing', year: '2024' },
  { id: 3, title: 'Research Intern', company: 'Pfizer', type: 'Completed', year: '2022' },
];

const PastInternships = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const filtered = internshipHistory.filter((i) => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? i.type === filterType : true;
    return matchesSearch && matchesType;
  });

  const handleViewDetails = (id) => {
    navigate(`/internship-history/${id}`);
  };

  return (
    <div>
      <h2>Past & Present Internships</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>

      <ul>
        {filtered.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> at {item.company} ({item.year}) — {item.type}
            <button onClick={() => handleViewDetails(item.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastInternships;
