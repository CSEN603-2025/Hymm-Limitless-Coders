import React, { useState } from 'react';
//(FR 40)
const SearchPastInternships = ({ internships }) => {
  const [search, setSearch] = useState('');

  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3>Search Past Internships</h3>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredInternships.map((internship) => (
          <li key={internship.id}>{internship.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPastInternships;
