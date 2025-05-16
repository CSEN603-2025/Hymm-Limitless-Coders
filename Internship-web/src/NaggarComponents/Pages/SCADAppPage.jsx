import React, { useState, useEffect } from 'react';
import '../Styles/SCADApp.css'
/**
 * Appointment Scheduling Page for SCAD Office staff to schedule video calls
 * with students for career guidance and report clarifications
 */
const ScadAppointmentPage = () => {
  // State for student list (would typically come from an API)
  const [students, setStudents] = useState([]);
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // State for form fields
  const [formData, setFormData] = useState({
    selectedStudent: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'career-guidance',
    description: '',
    notifyStudent: true
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

  // Simulate fetching student data
  useEffect(() => {
    // This would be an API call in a real application
    const fetchStudents = () => {
      // Simulated API response data
      const mockStudentsData = [
        { id: '1', name: 'Ahmed Ali', email: 'ahmed.a@university.edu', program: 'Computer Science' },
        { id: '2', name: 'Sarah Johnson', email: 'sarah.j@university.edu', program: 'Business Administration' },
        { id: '3', name: 'Mei Zhang', email: 'mei.z@university.edu', program: 'Electrical Engineering' },
        { id: '4', name: 'Carlos Rodriguez', email: 'carlos.r@university.edu', program: 'Psychology' },
        { id: '5', name: 'Priya Patel', email: 'priya.p@university.edu', program: 'Medicine' },
        { id: '6', name: 'John Smith', email: 'john.s@university.edu', program: 'Architecture' },
        { id: '7', name: 'Fatima Hassan', email: 'fatima.h@university.edu', program: 'Environmental Science' },
        { id: '8', name: 'David Kim', email: 'david.k@university.edu', program: 'Finance' }
      ];
      
      setStudents(mockStudentsData);
      setIsLoading(false);
    };

    // Simulate network delay
    setTimeout(fetchStudents, 800);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Get student details by ID
  const getSelectedStudentDetails = () => {
    return students.find(student => student.id === formData.selectedStudent) || {};
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.selectedStudent) newErrors.selectedStudent = 'Please select a student';
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
    console.log('Appointment scheduled:', formData);
    setIsSubmitted(true);
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Reset form to schedule another appointment
  const handleReset = () => {
    setFormData({
      selectedStudent: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: 'career-guidance',
      description: '',
      notifyStudent: true
    });
    setIsSubmitted(false);
  };

  // Get selected student information for display
  const selectedStudent = getSelectedStudentDetails();

  return (
    <div className="page-container">
      <main className="main-content">
        <section className="card appointment-card">
          <div className="card-header">
            <h2>Schedule Student Appointment</h2>
            <p className="subtitle">Create video call appointments with students for career guidance or report clarifications</p>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading student data...</p>
            </div>
          ) : !isSubmitted ? (
            <form className="form appointment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="selectedStudent" className="label">Select Student</label>
                <select 
                  id="selectedStudent" 
                  name="selectedStudent" 
                  className={`input ${errors.selectedStudent ? 'input-error' : ''}`}
                  value={formData.selectedStudent}
                  onChange={handleChange}
                >
                  <option value="">-- Select a student --</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.program})
                    </option>
                  ))}
                </select>
                {errors.selectedStudent && <p className="error-text">{errors.selectedStudent}</p>}
              </div>

              {formData.selectedStudent && (
                <div className="student-details-card">
                  <h4>Selected Student Details</h4>
                  <div className="student-details">
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Program:</strong> {selectedStudent.program}</p>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="appointmentDate" className="label">Appointment Date</label>
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
                  <label htmlFor="appointmentTime" className="label">Appointment Time</label>
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
                <label htmlFor="description" className="label">Appointment Details</label>
                <textarea 
                  id="description" 
                  name="description" 
                  className={`input textarea ${errors.description ? 'input-error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide details about the appointment purpose and any necessary preparation"
                  rows="4"
                ></textarea>
                {errors.description && <p className="error-text">{errors.description}</p>}
              </div>

              <div className="form-group">
                <div className="checkbox-option">
                  <input 
                    type="checkbox" 
                    id="notifyStudent" 
                    name="notifyStudent" 
                    checked={formData.notifyStudent}
                    onChange={handleChange}
                  />
                  <label htmlFor="notifyStudent">Send email notification to student</label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">Schedule Appointment</button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Appointment Successfully Scheduled!</h3>
              <p>The appointment has been scheduled and {formData.notifyStudent ? 'an email notification has been sent to the student.' : 'no notification has been sent to the student.'}</p>
              <div className="appointment-details">
                <p><strong>Student:</strong> {selectedStudent.name}</p>
                <p><strong>Date:</strong> {formData.appointmentDate}</p>
                <p><strong>Time:</strong> {formData.appointmentTime}</p>
                <p><strong>Type:</strong> {formData.appointmentType === 'career-guidance' ? 'Career Guidance' : 'Report Clarifications'}</p>
                <p><strong>Details:</strong> {formData.description}</p>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-primary" onClick={handleReset}>Schedule Another Appointment</button>
              </div>
            </div>
          )}
        </section>

       
      </main>
    </div>
  );
};

export default ScadAppointmentPage;