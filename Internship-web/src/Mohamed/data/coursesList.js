

// //   export default dummyCourses;

// // Regular courses (open to all)
// const regularCourses = [
//   { id: 1, name: 'Introduction to Computer Science' },
//   { id: 2, name: 'Data Structures and Algorithms' },
//   { id: 3, name: 'Web Development' },
//   { id: 4, name: 'Database Management Systems' },
//   { id: 5, name: 'Operating Systems' },
//   { id: 6, name: 'Artificial Intelligence' },
//   { id: 7, name: 'Machine Learning' },
//   { id: 8, name: 'Software Engineering' }
// ];

// // Pro-only courses (exclusive)
// const proCourses = [
//   { id: 9, name: 'Deep Learning with TensorFlow' },
//   { id: 10, name: 'Cloud Computing with AWS' },
//   { id: 11, name: 'Cybersecurity Essentials' },
//   { id: 12, name: 'Blockchain Development' },
//   { id: 13, name: 'DevOps Fundamentals' },
//   { id: 14, name: 'Natural Language Processing' }
// ];

// // Combined export
// const dummyCourses = {
//   regular: regularCourses,
//   pro: [...regularCourses, ...proCourses]
// };

// export default dummyCourses;


// Regular courses
const regularCourses = [
  { id: 1, name: 'Introduction to Computer Science', majors: ['Computer Science'] },
  { id: 2, name: 'Data Structures and Algorithms', majors: ['Computer Science'] },
  { id: 3, name: 'Web Development', majors: ['Computer Science', 'Information Systems'] },
  { id: 4, name: 'Database Management Systems', majors: ['Computer Science', 'Information Systems'] },
  { id: 5, name: 'Operating Systems', majors: ['Computer Science'] },
  { id: 6, name: 'Artificial Intelligence', majors: ['Computer Science'] },
  { id: 7, name: 'Machine Learning', majors: ['Computer Science'] },
  { id: 8, name: 'Software Engineering', majors: ['Computer Science', 'Information Systems'] },
  { id: 15, name: 'Circuit Analysis', majors: ['Electrical Engineering'] },
  { id: 16, name: 'Signal Processing', majors: ['Electrical Engineering'] },
  { id: 17, name: 'Power Systems', majors: ['Electrical Engineering'] },
  { id: 18, name: 'Thermodynamics', majors: ['Mechanical Engineering'] },
  { id: 19, name: 'Fluid Mechanics', majors: ['Mechanical Engineering'] },
  { id: 20, name: 'Robotics', majors: ['Mechanical Engineering', 'Electrical Engineering'] }
];

// Pro-only courses
const proCourses = [
  { id: 9, name: 'Deep Learning with TensorFlow', majors: ['Computer Science'] },
  { id: 10, name: 'Cloud Computing with AWS', majors: ['Computer Science'] },
  { id: 11, name: 'Cybersecurity Essentials', majors: ['Computer Science'] },
  { id: 12, name: 'Blockchain Development', majors: ['Computer Science'] },
  { id: 13, name: 'DevOps Fundamentals', majors: ['Computer Science', 'Information Systems'] },
  { id: 14, name: 'Natural Language Processing', majors: ['Computer Science'] }
];

const dummyCourses = {
  regular: regularCourses,
  pro: [...regularCourses, ...proCourses]
};

export default dummyCourses;
