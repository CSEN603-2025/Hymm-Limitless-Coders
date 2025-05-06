import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../Components /StudentCard';

const dummyStudents = [
  { id: 1, name: 'Alice Johnson', status: 'Not Started' },
  { id: 2, name: 'Bob Smith', status: 'In Progress' },
  { id: 3, name: 'Charlie Lee', status: 'Completed' },
];

function StudentList() {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const filteredStudents = dummyStudents.filter(student =>
    filter === '' || student.status === filter
  );

  const handleViewProfile = (id) => {
    navigate(`/students/${id}`);
  };

  return (
    <div>
      <h1>All Students</h1>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <div>
        {filteredStudents.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onViewProfile={() => handleViewProfile(student.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;