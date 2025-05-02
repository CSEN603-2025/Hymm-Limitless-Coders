import React, { useEffect, useState } from 'react';
import majors from '../data/majors';

const SelectMajorSemester = () => {
  const [selected, setSelected] = useState({
    major: '',
    semester: ''
  });

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedMajorSemester'));
    if (saved) setSelected(saved);
  }, []);

 
  useEffect(() => {
    localStorage.setItem('selectedMajorSemester', JSON.stringify(selected));
  }, [selected]);

  const handleMajorChange = (e) => {
    setSelected((prev) => ({ ...prev, major: e.target.value }));
  };

  const handleSemesterChange = (e) => {
    setSelected((prev) => ({ ...prev, semester: e.target.value }));
  };

  return (
    <div>
      <h2>Select Major & Semester</h2>
      
      <div>
        <label>Major:</label>
        <select value={selected.major} onChange={handleMajorChange}>
          <option value=''>-- Select Major --</option>
          {majors.map((m) => (
            <option key={m.id} value={m.name}>{m.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Semester:</label>
        <select value={selected.semester} onChange={handleSemesterChange}>
          <option value=''>-- Select Semester --</option>
          <option value='Fall'>Fall</option>
          <option value='Spring'>Spring</option>
          <option value='Summer'>Summer</option>
        </select>
      </div>

      <p style={{ marginTop: '1rem' }}>
        <strong>Selected Major:</strong> {selected.major || 'None'} <br />
        <strong>Selected Semester:</strong> {selected.semester || 'None'}
      </p>
    </div>
  );
};

export default SelectMajorSemester;
