import React, { useState } from 'react';

const courseList = [
  'Web Development',
  'AI Fundamentals',
  'Databases',
  'UI/UX Design',
  'Project Management',
];

const FinalReportSubmission = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [reportText, setReportText] = useState('');
  const [reportStatus, setReportStatus] = useState('Rejected'); // Can be 'Pending', 'Accepted', 'Rejected'
  const [appealText, setAppealText] = useState('');

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    console.log('Selected Courses:', selectedCourses);
    console.log('Final Report:', reportText);
    alert('Report submitted! (simulated)');
    setReportStatus('Pending'); // simulate it being sent
  };

  const handleAppeal = () => {
    console.log('Appeal Text:', appealText);
    alert('Appeal submitted! (simulated)');
  };

  return (
    <div>
      <h2>Final Report Submission</h2>

      <h3>Select Helpful Courses</h3>
      {courseList.map((course, i) => (
        <div key={i}>
          <label>
            <input
              type="checkbox"
              checked={selectedCourses.includes(course)}
              onChange={() => toggleCourse(course)}
            />
            {course}
          </label>
        </div>
      ))}

      <h3>Write Final Report</h3>
      <textarea
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        placeholder="Enter final report here..."
        rows="5"
        cols="50"
      />

      <br />
      <button onClick={handleSubmitReport}>Submit Report</button>

      <h3>Report Status</h3>
      <p>Status: <strong>{reportStatus}</strong></p>

      {reportStatus === 'Rejected' && (
        <div>
          <h4>Appeal Rejected Report</h4>
          <textarea
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            placeholder="Write your appeal here..."
            rows="3"
            cols="50"
          />
          <br />
          <button onClick={handleAppeal}>Submit Appeal</button>
        </div>
      )}
    </div>
  );
};

export default FinalReportSubmission;
