import React from 'react';
import { useParams } from 'react-router-dom';
import StudentProfile from '../Components /StudentProfile';

const dummyStudents = [
  { id: 1, name: 'Alice Johnson', status: 'Not Started', email: 'alice@example.com', major: 'Computer Science' },
  { id: 2, name: 'Bob Smith', status: 'In Progress', email: 'bob@example.com', major: 'Business' },
  { id: 3, name: 'Charlie Lee', status: 'Completed', email: 'charlie@example.com', major: 'Engineering' },
];

function StudentProfilePage() {
  const { id } = useParams();
  const student = dummyStudents.find(s => s.id === parseInt(id));

  if (!student) return <p>Student not found.</p>;

  return( 
    <div>
      
      <StudentProfile student={student} />;
    </div>
  )
}

export default StudentProfilePage;