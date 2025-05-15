// import React, { useState, useEffect } from 'react';
// import '../css/EditProfile.css'; // 👈 Import the CSS

// const EditProfile = () => {
//   const [profile, setProfile] = useState({ name: '', email: '' });

//   useEffect(() => {
//     const storedProfile = localStorage.getItem('userProfile');
//     if (storedProfile) {
//       setProfile(JSON.parse(storedProfile));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('userProfile', JSON.stringify(profile));
//     alert('Profile updated successfully!');
//   };

//   return (
//     <div className="edit-profile-card" style={{ paddingTop: '200px' }}>
//       <h2 className="edit-profile-title">Edit Profile</h2>
//       <form onSubmit={handleSubmit} className="edit-profile-form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name"
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <button type="submit" className="save-button">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;





import React, { useState, useEffect } from 'react';
import '../css/EditProfile.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    jobInterests: '',
    partTimeJobs: [],
    internships: [],
    collegeActivities: ''
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDynamicChange = (type, index, e) => {
    const { name, value } = e.target;
    const updatedList = [...profile[type]];
    updatedList[index][name] = value;
    setProfile((prev) => ({
      ...prev,
      [type]: updatedList
    }));
  };

  const addDynamicItem = (type) => {
    setProfile((prev) => ({
      ...prev,
      [type]: [...prev[type], { company: '', duration: '', responsibilities: '' }]
    }));
  };

  const removeDynamicItem = (type, index) => {
    const updatedList = profile[type].filter((_, i) => i !== index);
    setProfile((prev) => ({
      ...prev,
      [type]: updatedList
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

        <div className="form-group">
          <label htmlFor="jobInterests">Job Interests:</label>
          <textarea
            id="jobInterests"
            name="jobInterests"
            value={profile.jobInterests}
            onChange={handleChange}
            placeholder="Describe your job interests"
          ></textarea>
        </div>

        {/* Internships Section */}
        <div className="form-group">
          <label>Previous Internships:</label>
          {profile.internships.map((intern, index) => (
            <div key={index} className="nested-form-group">
              <input
                type="text"
                name="company"
                value={intern.company}
                onChange={(e) => handleDynamicChange('internships', index, e)}
                placeholder="Company Name"
              />
              <input
                type="text"
                name="duration"
                value={intern.duration}
                onChange={(e) => handleDynamicChange('internships', index, e)}
                placeholder="Duration"
              />
              <textarea
                name="responsibilities"
                value={intern.responsibilities}
                onChange={(e) => handleDynamicChange('internships', index, e)}
                placeholder="Responsibilities"
              ></textarea>
              <button type="button" onClick={() => removeDynamicItem('internships', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addDynamicItem('internships')}>Add Internship</button>
        </div>

        {/* Part-Time Jobs Section */}
        <div className="form-group">
          <label>Part-Time Jobs:</label>
          {profile.partTimeJobs.map((job, index) => (
            <div key={index} className="nested-form-group">
              <input
                type="text"
                name="company"
                value={job.company}
                onChange={(e) => handleDynamicChange('partTimeJobs', index, e)}
                placeholder="Company Name"
              />
              <input
                type="text"
                name="duration"
                value={job.duration}
                onChange={(e) => handleDynamicChange('partTimeJobs', index, e)}
                placeholder="Duration"
              />
              <textarea
                name="responsibilities"
                value={job.responsibilities}
                onChange={(e) => handleDynamicChange('partTimeJobs', index, e)}
                placeholder="Responsibilities"
              ></textarea>
              <button type="button" onClick={() => removeDynamicItem('partTimeJobs', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addDynamicItem('partTimeJobs')}>Add Part-Time Job</button>
        </div>

        <div className="form-group">
          <label htmlFor="collegeActivities">College Activities:</label>
          <textarea
            id="collegeActivities"
            name="collegeActivities"
            value={profile.collegeActivities}
            onChange={handleChange}
            placeholder="Mention any college events, clubs, or committees you participated in"
          ></textarea>
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
