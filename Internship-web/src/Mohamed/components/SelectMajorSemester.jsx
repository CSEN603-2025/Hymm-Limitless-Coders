import React, { useEffect, useState } from 'react';
import majors from '../data/majors';
import '../css/SelectMajorSemester.css'; // 👈 Import the CSS

const SelectMajorSemester = () => {
  const [selected, setSelected] = useState({
    major: '',
    semester: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedMajorSemester'));
    if (saved) setSelected(saved);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('selectedMajorSemester', JSON.stringify(selected));
  // }, [selected]);

  const handleMajorChange = (e) => {
    setSelected((prev) => ({ ...prev, major: e.target.value }));
  let edited={...selected,major: e.target.value}
     localStorage.setItem('selectedMajorSemester', JSON.stringify(edited));
  };

  const handleSemesterChange = (e) => {
    setSelected((prev) => ({ ...prev, semester: e.target.value }));
      let edited={...selected,semester: e.target.value}
     localStorage.setItem('selectedMajorSemester', JSON.stringify(edited));
  };

  return (
    <div className="dashboard-section" style={{ paddingTop: '200px' }}> 
      <h3 className="section-title">Select Major & Semester</h3>

      <div className="form-group">
        <label className="form-label">Major:</label>
        <select
          value={selected.major}
          onChange={handleMajorChange}
          className="form-select"
        >
          <option value="">-- Select Major --</option>
          {majors.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Semester:</label>
        <select
          value={selected.semester}
          onChange={handleSemesterChange}
          className="form-select"
        >
          <option value="">-- Select Semester --</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
      </div>

      <p className="selection-summary">
        <strong>Selected Major:</strong> {selected.major || 'None'} <br />
        <strong>Selected Semester:</strong> {selected.semester || 'None'}
      </p>
    </div>
  );
};

export default SelectMajorSemester;
