import React, { useState, useEffect } from 'react';
import '../css/EditProfile.css'; // 👈 Import the CSS

const EditProfile = () => {
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile updated successfully!');
  };

  return (
    <div className="edit-profile-card" style={{ paddingTop: '200px' }}>
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
