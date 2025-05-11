// src/pages/EditProfile.jsx
import React, { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Hamza',
    email: 'hamza@student.com',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    // In real app, send formData to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfile;
