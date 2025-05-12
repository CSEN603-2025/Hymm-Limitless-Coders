// import React, { useState, useEffect } from 'react';
// import dummyCourses from "../data/coursesList";

// const CourseList = () => {
//   const [selectedCourses, setSelectedCourses] = useState([]);


//   useEffect(() => {
//     const storedCourses = JSON.parse(localStorage.getItem('helpfulCourses')) || [];
//     setSelectedCourses(storedCourses);
//   }, []);

  
//   useEffect(() => {
//     localStorage.setItem('helpfulCourses', JSON.stringify(selectedCourses));
//   }, [selectedCourses]);

//   const handleCourseSelect = (courseId) => {
//     setSelectedCourses((prevSelected) => {
//       if (prevSelected.includes(courseId)) {
//         return prevSelected.filter((id) => id !== courseId); // Deselect course
//       } else {
//         return [...prevSelected, courseId]; // Select course
//       }
//     });
//   };

//   return (
//     <div>
//       <h3>Course List</h3>
//       <ul>
//         {dummyCourses.map((course) => (
//           <li key={course.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedCourses.includes(course.id)}
//                 onChange={() => handleCourseSelect(course.id)}
//               />
//               {course.name}
//               {selectedCourses.includes(course.id) && (
//                 <span style={{ marginLeft: '10px', color: 'green' }}>(Helpful)</span>
//               )}
//             </label>
//           </li>
//         ))}
//       </ul>

//       <h4>Helpful Selected Courses:</h4>
//       <ul>
//         {selectedCourses.length === 0 ? (
//           <p>No courses selected.</p>
//         ) : (
//           selectedCourses.map((courseId) => {
//             const course = dummyCourses.find((course) => course.id === courseId); // Use dummyCourses here
//             return <li key={courseId}>{course.name}</li>;
//           })
//         )}
//       </ul>
//     </div>
//   );
// };

// export default CourseList;





















import React, { useState, useEffect } from 'react';
import dummyCourses from '../data/coursesList';
import '../css/CourseList.css'; // 👈 Add this CSS file
import Navbar from './Navbar';
const CourseList = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('helpfulCourses')) || [];
    setSelectedCourses(storedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem('helpfulCourses', JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const handleCourseSelect = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  return (
    <div className="course-container" style={{ paddingTop: '200px' }}>
      <Navbar />
      <h3 className="course-title">Course List</h3>
      <ul className="course-list">
        {dummyCourses.map((course) => (
          <li key={course.id} className="course-item">
            <label>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => handleCourseSelect(course.id)}
              />
              <span className="course-name">{course.name}</span>
              {selectedCourses.includes(course.id) && (
                <span className="helpful-tag">(Helpful)</span>
              )}
            </label>
          </li>
        ))}
      </ul>

      <h4 className="selected-title">Helpful Selected Courses:</h4>
      {selectedCourses.length === 0 ? (
        <p className="no-selected">No courses selected.</p>
      ) : (
        <ul className="selected-courses">
          {selectedCourses.map((courseId) => {
            const course = dummyCourses.find((c) => c.id === courseId);
            return <li key={courseId}>{course.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
