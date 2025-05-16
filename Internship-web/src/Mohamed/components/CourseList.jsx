// import React, { useState, useEffect } from 'react';
// import dummyCourses from '../data/coursesList';
// import '../css/CourseList.css'; // 👈 Add this CSS file

// const CourseList = () => {
// const role = localStorage.getItem('role');
//   const cousesToUse = role === 'prostudent' ? dummyCourses.pro : dummyCourses.regular;


//   const [selectedCourses, setSelectedCourses] = useState([]);

  
//   useEffect(() => {
//     const storedCourses = JSON.parse(localStorage.getItem('helpfulCourses')) || [];
//     setSelectedCourses(storedCourses);
//   }, []);

//   // useEffect(() => {
//   //   localStorage.setItem('helpfulCourses', JSON.stringify(selectedCourses));
//   // }, [selectedCourses]);

//   const handleCourseSelect = (courseId) => {
//     setSelectedCourses((prevSelected) =>
//       prevSelected.includes(courseId)
//         ? prevSelected.filter((id) => id !== courseId)
//         : [...prevSelected, courseId]
//     );
// let courses=selectedCourses.includes(courseId) ? selectedCourses.filter((id) => id !== courseId) : [...selectedCourses,courseId]
//  localStorage.setItem('helpfulCourses', JSON.stringify(courses));

//   };





//   return (
//     <div className="course-container" style={{ paddingTop: '200px' }}>
//       <h3 className="course-title">Course List</h3>
//       <ul className="course-list">
//         {cousesToUse.map((course) => (
//           <li key={course.id} className="course-item">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedCourses.includes(course.id)}
//                 onChange={() => handleCourseSelect(course.id)}
//               />
//               <span className="course-name">{course.name}</span>
//               {selectedCourses.includes(course.id) && (
//                 <span className="helpful-tag">(Helpful)</span>
//               )}
//             </label>
//           </li>
//         ))}
//       </ul>

//       <h4 className="selected-title">Helpful Courses that helped me during my internships:</h4>
//       {selectedCourses.length === 0 ? (
//         <p className="no-selected">No courses selected.</p>
//       ) : (
//         <ul className="selected-courses">
//           {selectedCourses.map((courseId) => {
//             const course = cousesToUse.find((c) => c.id === courseId);
//             return course ? <li key={courseId}>{course?.name}</li>:"";
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CourseList;


import React, { useState, useEffect } from 'react';
import dummyCourses from '../data/coursesList';
import '../css/CourseList.css';

const CourseList = () => {
  const role = localStorage.getItem('role');
  const selectedMajorSemester = JSON.parse(localStorage.getItem('selectedMajorSemester'));
  const selectedMajor = selectedMajorSemester?.major

  const allCourses = role === 'prostudent' ? dummyCourses.pro : dummyCourses.regular;

  const filteredCourses = selectedMajor
    ? allCourses.filter((course) => course.majors?.includes(selectedMajor))
    : allCourses;

  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('helpfulCourses')) || [];
    setSelectedCourses(storedCourses);
  }, []);

  const handleCourseSelect = (courseId) => {
    const updatedCourses = selectedCourses.includes(courseId)
      ? selectedCourses.filter((id) => id !== courseId)
      : [...selectedCourses, courseId];

    setSelectedCourses(updatedCourses);
    localStorage.setItem('helpfulCourses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="course-container" style={{ paddingTop: '200px' }}>
      <h3 className="course-title">Course List ({selectedMajor || 'All Majors'})</h3>
      <ul className="course-list">
        {filteredCourses.map((course) => (
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

      <h4 className="selected-title">Helpful Courses that helped me during my internships:</h4>
      {selectedCourses.length === 0 ? (
        <p className="no-selected">No courses selected.</p>
      ) : (
        <ul className="selected-courses">
          {selectedCourses.map((courseId) => {
            const course = filteredCourses.find((c) => c.id === courseId);
            return course ? <li key={courseId}>{course?.name}</li> : null;
          })}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
