import React, { useState } from 'react';
import "../Styles/RequestApp.css";
/**
 * Appointment Request Page for PRO Students to schedule video calls
 * with SCAD Office for career guidance and report clarifications
 */
const RequestAppointment = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    email: '',
    contactNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'career-guidance',
    description: '',
  });

  // State for form errors
  const [errors, setErrors] = useState({});
  
  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/[- ]/g, ''))) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required';
    if (!formData.description.trim()) newErrors.description = 'Brief description is required';
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Submit form data to backend (simulated)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Reset form to submit another appointment
  const handleReset = () => {
    setFormData({
      studentName: '',
      studentId: '',
      email: '',
      contactNumber: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: 'career-guidance',
      description: '',
    });
    setIsSubmitted(false);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="card appointment-card">
          <div className="card-header">
            <h2>Request an Appointment</h2>
            <p className="subtitle">Schedule a video call with SCAD Office for career guidance or report clarifications</p>
          </div>

          {!isSubmitted ? (
            <form className="form appointment-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="studentName" className="label">Full Name</label>
                  <input 
                    type="text" 
                    id="studentName" 
                    name="studentName" 
                    className={`input ${errors.studentName ? 'input-error' : ''}`}
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.studentName && <p className="error-text">{errors.studentName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="studentId" className="label">Student ID</label>
                  <input 
                    type="text" 
                    id="studentId" 
                    name="studentId" 
                    className={`input ${errors.studentId ? 'input-error' : ''}`}
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter your student ID"
                  />
                  {errors.studentId && <p className="error-text">{errors.studentId}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="contactNumber" className="label">Contact Number</label>
                  <input 
                    type="tel" 
                    id="contactNumber" 
                    name="contactNumber" 
                    className={`input ${errors.contactNumber ? 'input-error' : ''}`}
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                  {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="appointmentDate" className="label">Preferred Date</label>
                  <input 
                    type="date" 
                    id="appointmentDate" 
                    name="appointmentDate" 
                    className={`input ${errors.appointmentDate ? 'input-error' : ''}`}
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={getMinDate()}
                  />
                  {errors.appointmentDate && <p className="error-text">{errors.appointmentDate}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="appointmentTime" className="label">Preferred Time</label>
                  <select 
                    id="appointmentTime" 
                    name="appointmentTime" 
                    className={`input ${errors.appointmentTime ? 'input-error' : ''}`}
                    value={formData.appointmentTime}
                    onChange={handleChange}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.appointmentTime && <p className="error-text">{errors.appointmentTime}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="label">Appointment Type</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input 
                      type="radio" 
                      id="career-guidance" 
                      name="appointmentType" 
                      value="career-guidance"
                      checked={formData.appointmentType === 'career-guidance'}
                      onChange={handleChange}
                    />
                    <label htmlFor="career-guidance">Career Guidance</label>
                  </div>
                  <div className="radio-option">
                    <input 
                      type="radio" 
                      id="report-clarifications" 
                      name="appointmentType" 
                      value="report-clarifications"
                      checked={formData.appointmentType === 'report-clarifications'}
                      onChange={handleChange}
                    />
                    <label htmlFor="report-clarifications">Report Clarifications</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="label">Brief Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  className={`input textarea ${errors.description ? 'input-error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide a brief description of your query"
                  rows="4"
                ></textarea>
                {errors.description && <p className="error-text">{errors.description}</p>}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">Request Appointment</button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Appointment Request Submitted!</h3>
              <p>Your appointment request has been successfully submitted. You will receive a confirmation email with the video call link once your appointment is confirmed.</p>
              <p className="appointment-details">
                <strong>Appointment Details:</strong><br />
                Date: {formData.appointmentDate}<br />
                Time: {formData.appointmentTime}<br />
                Type: {formData.appointmentType === 'career-guidance' ? 'Career Guidance' : 'Report Clarifications'}
              </p>
              <div className="form-actions">
                <button type="button" className="btn-primary" onClick={handleReset}>Request Another Appointment</button>
              </div>
            </div>
          )}
        </section>

        <section className="card info-card">
          <div className="card-header">
            <h3>Appointment Guidelines</h3>
          </div>
          <div className="card-content">
            <ul className="guideline-list">
              <li>Appointments must be requested at least 24 hours in advance.</li>
              <li>Video calls are available only for students with confirmed appointments.</li>
              <li>Please be on time for your scheduled appointment.</li>
              <li>If you need to cancel or reschedule, please do so at least 4 hours before your appointment.</li>
              <li>Prepare specific questions or concerns you would like to discuss during the call.</li>
              <li>Technical issues should be reported to the IT helpdesk.</li>
            </ul>
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default RequestAppointment;