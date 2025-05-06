import { useState } from "react";
import "./AppointmentForm.css";

export default function RequestAppointment({ setHasAppointment }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
    urgent: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Simulate API call
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasAppointment(true);
      // Show success message
      alert("Your appointment request has been submitted successfully! We'll contact you shortly.");
    } catch (error) {
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  
  return (
    <div className="appointment-container">
      <form onSubmit={handleSubmit} className="appointment-form">
        <h2 className="form-title">Request an Appointment</h2>
        <p className="form-subtitle">Please fill out the form below and we'll get back to you soon.</p>
        
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="example@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input ${errors.phone ? "input-error" : ""}`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date" className="form-label">Preferred Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              min={today}
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? "input-error" : ""}`}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="time" className="form-label">Preferred Time:</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`form-input ${errors.time ? "input-error" : ""}`}
            >
              <option value="">Select a time</option>
              <option value="morning">Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 4pm)</option>
              <option value="evening">Evening (4pm - 7pm)</option>
            </select>
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason" className="form-label">Reason for Appointment:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className={`form-input ${errors.reason ? "input-error" : ""}`}
            placeholder="Please describe your reason for the appointment..."
          ></textarea>
          {errors.reason && <span className="error-message">{errors.reason}</span>}
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="urgent"
            name="urgent"
            checked={formData.urgent}
            onChange={handleChange}
          />
          <label htmlFor="urgent" className="checkbox-label">
            This is an urgent matter
          </label>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? "Submitting..." : "Request Appointment"}
          </button>
        </div>
        
        <p className="form-note">
          * We will confirm your appointment via email or phone within 24 hours.
        </p>
      </form>
    </div>
  );
}