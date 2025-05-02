import React, { useState } from 'react';
//(FR 46)
const SelectHelpfulCourses = ({ courses }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  return (
    <div>
      <h3>Select Helpful Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <label>
              <input
                type="checkbox"
                value={course.id}
                checked={selectedCourses.includes(course.id)}
                onChange={handleChange}
              />
              {course.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectHelpfulCourses;
