import React, { useState } from 'react';

const MyApplications = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [applications] = useState([
    { id: 1, title: 'Frontend Intern', company: 'Google', status: 'Pending' },
    { id: 2, title: 'AI Intern', company: 'OpenAI', status: 'Accepted' },
    { id: 3, title: 'Business Analyst Intern', company: 'Dell', status: 'Rejected' },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    console.log('Uploaded file:', file.name);
    alert(`File "${file.name}" uploaded successfully (simulated)`);
  };

  return (
    <div>
      <h2>My Internship Applications</h2>

      <h3>Upload Extra Documents</h3>
      <input type="file" onChange={handleFileChange} />
      {uploadedFile && <p>Last uploaded: {uploadedFile.name}</p>}

      <h3>Applications List</h3>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <strong>{app.title}</strong> at {app.company} — 
            <em> {app.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyApplications;
