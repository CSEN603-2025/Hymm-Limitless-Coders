import React from 'react';
//(FR 45)
const CourseList = ({ courses }) => {
  return (
    <div>
      <h3>Course List</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
