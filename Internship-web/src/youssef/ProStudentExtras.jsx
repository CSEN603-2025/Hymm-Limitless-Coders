import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ProStudentExtras.css';

export default function ProStudentExtras() {
  const navigate = useNavigate();

  return (
    <div className="pro-container">
      {/* PRO Badge - Top Right */}
      <div className="pro-badge">
        PRO Badge - Active After 3 Months
      </div>

      <h2 className="pro-title">Pro Student Extras</h2>

      <p className="pro-subtitle">
        These are special features for PRO users who have completed 3 months.
      </p>

      <div className="pro-feature-list">
        <div className="pro-feature">
          <p className="pro-label">Flagged Reports</p>
          <button onClick={() => navigate('/flaggedreports')} className="pro-button">View</button>
        </div>

        <div className="pro-feature">
          <p className="pro-label">Join Meeting</p>
          <button onClick={() => navigate('/meeting')} className="pro-button">View</button>
        </div>

        <div className="pro-feature">
          <p className="pro-label">Companies That Viewed My Profile</p>
          <button onClick={() => navigate('/companiesViewed')} className="pro-button">View</button>
        </div>

        <div className="pro-feature">
          <p className="pro-label">Assessments</p>
          <button onClick={() => navigate('/onlineassessments')} className="pro-button">View</button>
        </div>

        <div className="pro-feature">
          <p className="pro-label">Workshops</p>
          <button onClick={() => navigate('/workshop')} className="pro-button">View</button>
        </div>
        
        <div className="pro-feature">
          <p className="pro-label">Call Interface</p>
          <button onClick={() => navigate('/SCAD/call')} className="pro-button">View</button>
        </div>

        <div className="pro-feature">
          <p className="pro-label">Request Appointment</p>
          <button onClick={() => navigate('/SCAD/RequestAppointment')} className="pro-button">View</button>
        </div>


        <div className="pro-feature">
          <p className="pro-label">Manage Appointments</p>
          <button onClick={() => navigate('/SCAD/manage')} className="pro-button">View</button>
        </div>
      </div>
    </div>
  );
}
