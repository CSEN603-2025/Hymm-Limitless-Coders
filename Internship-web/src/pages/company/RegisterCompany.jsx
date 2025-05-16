import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate

const RegisterCompany = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    size: '',
    logo: null,
  });

  const [docFile, setDocFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const handleFileChange = (e) => {
    setDocFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company Info:', formData);
    console.log('Logo:', formData.logo?.name);
    console.log('Uploaded Document:', docFile?.name);
    alert('Submitted! You will receive an email once reviewed.');

    const result = 'Accepted';
    setTimeout(() => {
      setStatus(result);
      if (result === 'Accepted') {
        localStorage.setItem('role', 'company');
        localStorage.setItem('userProfile', JSON.stringify(formData));

        navigate('/company'); // ✅ redirect to CompanyHome.jsx
      }
    }, 2000);
  };

  return (
    <main className="form-container" style={{ paddingTop: '200px' }}>
      <form className="form card" onSubmit={handleSubmit}>
        <h2 className="card-header" style={{ fontWeight: 'bold', color: '#000' }}>
          Company Registration
        </h2>

        <label htmlFor="name" className="label" style={{ fontWeight: 'bold', color: '#000' }}>Company Name</label>
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

        <label htmlFor="industry" className="label">Industry</label>
        <input
          id="industry"
          type="text"
          name="industry"
          className="input"
          placeholder="e.g., Technology, Finance, Education"
          value={formData.industry}
          onChange={handleChange}
          required
        />

        <label htmlFor="size" className="label">Company Size</label>
        <select
          id="size"
          name="size"
          className="input"
          value={formData.size}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select size</option>
          <option value="1-50">1-50</option>
          <option value="50-100">50-100</option>
          <option value="100-500">100-500</option>
          <option value=">500">500+</option>
          
        </select>

        <label htmlFor="logo" className="label">Company Logo</label>
        <input
          id="logo"
          type="file"
          className="input"
          accept="image/*"
          onChange={handleLogoChange}
          required
        />

        <label htmlFor="document" className="label">Upload Legitimacy Document</label>
        <input
          id="document"
          type="file"
          className="input"
          accept=".pdf,.png,.jpg,.jpeg"
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
