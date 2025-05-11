import React, { useState } from 'react';

const UploadDocs = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setStatus('Please select a file to upload.');
      return;
    }

    // Simulate upload
    setStatus(`File "${selectedFile.name}" uploaded successfully (simulated).`);
    setSelectedFile(null);
  };

  return (
    <main className="form-container">
      <section className="card">
        <h2 className="card-header">Upload Company Documents</h2>

        <div className="form">
          <label className="label" htmlFor="docUpload">Select PDF or Image:</label>
          <input
            type="file"
            id="docUpload"
            className="input"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />

          <button type="button" className="btn-primary" onClick={handleUpload}>
            Upload
          </button>

          {status && (
            <p className="status-text" style={{ color: status.startsWith('File') ? '#10B981' : '#EF4444' }}>
              {status}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default UploadDocs;
