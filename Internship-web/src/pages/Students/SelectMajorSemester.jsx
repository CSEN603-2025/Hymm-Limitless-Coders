import React, { useState } from 'react';

const majors = ['Computer Science', 'Business', 'Pharmacy', 'Engineering'];
const semesters = ['Fall 2024', 'Spring 2025', 'Summer 2025'];

const SelectMajorSemester = () => {
  const [selection, setSelection] = useState({
    major: '',
    semester: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Major and Semester:', selection);
    // TODO: Send this data to the backend if needed
  };

  return (
    <div>
      <h2>Select Major & Semester</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Major:
          <select name="major" value={selection.major} onChange={handleChange}>
            <option value="">-- Select Major --</option>
            {majors.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Semester:
          <select name="semester" value={selection.semester} onChange={handleChange}>
            <option value="">-- Select Semester --</option>
            {semesters.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SelectMajorSemester;
