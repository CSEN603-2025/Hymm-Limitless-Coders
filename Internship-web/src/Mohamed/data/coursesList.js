// // Dummy data for courses
// const dummyCourses = [
//     { id: 1, name: 'Introduction to Computer Science' },
//     { id: 2, name: 'Data Structures and Algorithms' },
//     { id: 3, name: 'Web Development' },
//     { id: 4, name: 'Database Management Systems' },
//     { id: 5, name: 'Operating Systems' },
//     { id: 6, name: 'Artificial Intelligence' },
//     { id: 7, name: 'Machine Learning' },
//     { id: 8, name: 'Software Engineering' },
//   ];




//   export default dummyCourses;

// Regular courses (open to all)
const regularCourses = [
  { id: 1, name: 'Introduction to Computer Science' },
  { id: 2, name: 'Data Structures and Algorithms' },
  { id: 3, name: 'Web Development' },
  { id: 4, name: 'Database Management Systems' },
  { id: 5, name: 'Operating Systems' },
  { id: 6, name: 'Artificial Intelligence' },
  { id: 7, name: 'Machine Learning' },
  { id: 8, name: 'Software Engineering' }
];

// Pro-only courses (exclusive)
const proCourses = [
  { id: 9, name: 'Deep Learning with TensorFlow' },
  { id: 10, name: 'Cloud Computing with AWS' },
  { id: 11, name: 'Cybersecurity Essentials' },
  { id: 12, name: 'Blockchain Development' },
  { id: 13, name: 'DevOps Fundamentals' },
  { id: 14, name: 'Natural Language Processing' }
];

// Combined export
const dummyCourses = {
  regular: regularCourses,
  pro: [...regularCourses, ...proCourses]
};

export default dummyCourses;
