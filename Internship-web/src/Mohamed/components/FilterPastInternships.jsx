import React, { useState } from 'react';
//(FR 41)
const FilterPastInternships = ({ internships }) => {
  const [filter, setFilter] = useState('');

  const filteredInternships = internships.filter((internship) =>
    internship.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h3>Filter Past Internships</h3>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="ongoing">Ongoing</option>
      </select>
      <ul>
        {filteredInternships.map((internship) => (
          <li key={internship.id}>{internship.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPastInternships;
