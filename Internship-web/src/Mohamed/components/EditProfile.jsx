

// import React, { useState, useEffect } from 'react';
// import '../css/EditProfile.css';

// const EditProfile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     jobInterests: '',
//     partTimeJobs: [],
//     internships: [],
//     collegeActivities: ''
//   });

//   useEffect(() => {
//     try {
//       const storedProfile = localStorage.getItem('userProfile');
//       if (storedProfile) {
//         const parsed = JSON.parse(storedProfile);

//         // Ensure default structure
//         setProfile({
//           name: parsed.name || '',
//           email: parsed.email || '',
//           jobInterests: parsed.jobInterests || '',
//           partTimeJobs: Array.isArray(parsed.partTimeJobs) ? parsed.partTimeJobs : [],
//           internships: Array.isArray(parsed.internships) ? parsed.internships : [],
//           collegeActivities: parsed.collegeActivities || ''
//         });
//       }
//     } catch (err) {
//       console.error("Error parsing profile from localStorage", err);
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDynamicChange = (type, index, e) => {
//     const { name, value } = e.target;
//     setProfile(prev => {
//       const updatedList = [...prev[type]];
//       updatedList[index] = {
//         ...updatedList[index],
//         [name]: value
//       };
//       return { ...prev, [type]: updatedList };
//     });
//   };

//   const addDynamicItem = (type) => {
//     setProfile(prev => ({
//       ...prev,
//       [type]: [...prev[type], { company: '', duration: '', responsibilities: '' }]
//     }));
//   };

//   const removeDynamicItem = (type, index) => {
//     setProfile(prev => ({
//       ...prev,
//       [type]: prev[type].filter((_, i) => i !== index)
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
//           <input id="name" name="name" value={profile.name} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input id="email" type="email" name="email" value={profile.email} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label htmlFor="jobInterests">Job Interests:</label>
//           <textarea id="jobInterests" name="jobInterests" value={profile.jobInterests} onChange={handleChange} />
//         </div>

//         {/* Internships */}
//         <div className="form-group">
//           <label>Internships:</label>
//           {profile.internships.map((intern, index) => (
//             <div key={index} className="nested-form-group">
//               <input name="company" value={intern.company} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Company Name" />
//               <input name="duration" value={intern.duration} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Duration" />
//               <textarea name="responsibilities" value={intern.responsibilities} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Responsibilities" />
//               <button type="button" onClick={() => removeDynamicItem('internships', index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addDynamicItem('internships')}>Add Internship</button>
//         </div>

//         {/* Part-Time Jobs */}
//         <div className="form-group">
//           <label>Part-Time Jobs:</label>
//           {profile.partTimeJobs.map((job, index) => (
//             <div key={index} className="nested-form-group">
//               <input name="company" value={job.company} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Company Name" />
//               <input name="duration" value={job.duration} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Duration" />
//               <textarea name="responsibilities" value={job.responsibilities} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Responsibilities" />
//               <button type="button" onClick={() => removeDynamicItem('partTimeJobs', index)}>Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addDynamicItem('partTimeJobs')}>Add Part-Time Job</button>
//         </div>

//         <div className="form-group">
//           <label htmlFor="collegeActivities">College Activities:</label>
//           <textarea id="collegeActivities" name="collegeActivities" value={profile.collegeActivities} onChange={handleChange} />
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
    collegeActivities: '',
    assessments: []  // assessments saved on profile
  });

  const [availableAssessments, setAvailableAssessments] = useState([]); // assessments you took & stored in completedAssessments
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('');

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({
          name: parsed.name || '',
          email: parsed.email || '',
          jobInterests: parsed.jobInterests || '',
          partTimeJobs: Array.isArray(parsed.partTimeJobs) ? parsed.partTimeJobs : [],
          internships: Array.isArray(parsed.internships) ? parsed.internships : [],
          collegeActivities: parsed.collegeActivities || '',
          assessments: Array.isArray(parsed.assessments) ? parsed.assessments : []
        });
      }

      const storedAssessments = localStorage.getItem('completedAssessments');
      if (storedAssessments) {
        setAvailableAssessments(JSON.parse(storedAssessments));
      }
    } catch (err) {
      console.error("Error parsing from localStorage", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDynamicChange = (type, index, e) => {
    const { name, value } = e.target;
    setProfile(prev => {
      const updatedList = [...prev[type]];
      updatedList[index] = {
        ...updatedList[index],
        [name]: value
      };
      return { ...prev, [type]: updatedList };
    });
  };

  const addDynamicItem = (type) => {
    setProfile(prev => ({
      ...prev,
      [type]: [...prev[type], { company: '', duration: '', responsibilities: '' }]
    }));
  };

  const removeDynamicItem = (type, index) => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Add selected assessment to profile.assessments if not already added
  const addAssessmentToProfile = () => {
    if (!selectedAssessmentId) return;

    const assessmentToAdd = availableAssessments.find(a => a.assessmentId.toString() === selectedAssessmentId);
    if (!assessmentToAdd) return;

    // Avoid duplicates by assessmentId
    if (profile.assessments.some(a => a.assessmentId === assessmentToAdd.assessmentId)) {
      alert('Assessment already added to profile!');
      return;
    }

    setProfile(prev => ({
      ...prev,
      assessments: [...prev.assessments, assessmentToAdd]
    }));

    setSelectedAssessmentId('');
  };

  const removeAssessmentFromProfile = (assessmentId) => {
    setProfile(prev => ({
      ...prev,
      assessments: prev.assessments.filter(a => a.assessmentId !== assessmentId)
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
          <input id="name" name="name" value={profile.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="jobInterests">Job Interests:</label>
          <textarea id="jobInterests" name="jobInterests" value={profile.jobInterests} onChange={handleChange} />
        </div>

        {/* Internships */}
        <div className="form-group">
          <label>Internships:</label>
          {profile.internships.map((intern, index) => (
            <div key={index} className="nested-form-group">
              <input name="company" value={intern.company} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Company Name" />
              <input name="duration" value={intern.duration} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Duration" />
              <textarea name="responsibilities" value={intern.responsibilities} onChange={(e) => handleDynamicChange('internships', index, e)} placeholder="Responsibilities" />
              <button type="button" onClick={() => removeDynamicItem('internships', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addDynamicItem('internships')}>Add Internship</button>
        </div>

        {/* Part-Time Jobs */}
        <div className="form-group">
          <label>Part-Time Jobs:</label>
          {profile.partTimeJobs.map((job, index) => (
            <div key={index} className="nested-form-group">
              <input name="company" value={job.company} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Company Name" />
              <input name="duration" value={job.duration} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Duration" />
              <textarea name="responsibilities" value={job.responsibilities} onChange={(e) => handleDynamicChange('partTimeJobs', index, e)} placeholder="Responsibilities" />
              <button type="button" onClick={() => removeDynamicItem('partTimeJobs', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addDynamicItem('partTimeJobs')}>Add Part-Time Job</button>
        </div>

        <div className="form-group">
          <label htmlFor="collegeActivities">College Activities:</label>
          <textarea id="collegeActivities" name="collegeActivities" value={profile.collegeActivities} onChange={handleChange} />
        </div>

        {/* Assessments selection */}
        <div className="form-group">
          <label>Add Completed Assessment:</label>
          <select
            value={selectedAssessmentId}
            onChange={(e) => setSelectedAssessmentId(e.target.value)}
          >
            <option value="">-- Select an assessment --</option>
            {availableAssessments.map((a) => (
              <option key={a.assessmentId} value={a.assessmentId}>
                Assessment #{a.assessmentId} - Score: {a.score}
              </option>
            ))}
          </select>
          <button type="button" onClick={addAssessmentToProfile} disabled={!selectedAssessmentId}>
            Add Assessment
          </button>
        </div>

        {/* List of assessments added to profile */}
        <div className="form-group">
          <label>Selected Assessments:</label>
          {profile.assessments.length === 0 && <p>No assessments added.</p>}
          {profile.assessments.map((a) => (
            <div key={a.assessmentId} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
              <div>
                <strong>Assessment ID:</strong> {a.assessmentId} &nbsp;|&nbsp; <strong>Score:</strong> {a.score}
              </div>
              
              <button type="button" onClick={() => removeAssessmentFromProfile(a.assessmentId)}>Remove</button>
            </div>
          ))}
        </div>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
