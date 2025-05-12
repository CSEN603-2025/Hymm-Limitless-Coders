import React, { useState } from 'react';
import CompanyHome from './CompanyHome';
const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
  });

  const [docFile, setDocFile] = useState(null);
  const [status, setStatus] = useState(null); // null | "Accepted" | "Rejected"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setDocFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Info:', formData);
    console.log('Uploaded Document:', docFile?.name);
    alert('Submitted! You will receive an email once reviewed.');

    const result = Math.random() > 0.5 ? 'Accepted' : 'Rejected';
    setTimeout(() => setStatus(result), 2000);
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
       
      <form className="form card" onSubmit={handleSubmit}>
        <h2 className="card-header">Company Registration</h2>

        <label htmlFor="name" className="label">Company Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="input"
          placeholder="e.g., OpenAI"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="label">Official Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="input"
          placeholder="e.g., contact@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="website" className="label">Company Website</label>
        <input
          id="website"
          type="url"
          name="website"
          className="input"
          placeholder="https://example.com"
          value={formData.website}
          onChange={handleChange}
          required
        />

        <label htmlFor="document" className="label">Upload Legitimacy Document</label>
        <input
          id="document"
          type="file"
          className="input"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="btn-primary" aria-label="Submit company registration">
          Register
        </button>

        {status && (
          <p className="status-text">
            Email Sent: Your company was <span className={`status-${status.toLowerCase()}`}>{status}</span>.
          </p>
        )}
      </form>
    </main>
  );
};

export default RegisterCompany;
