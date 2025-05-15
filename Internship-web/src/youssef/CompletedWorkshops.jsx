import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CompletedWorkshopsPage() {
  const navigate = useNavigate();

  const completedWorkshops = [
    { id: 1, title: 'Intro to HTML', date: '2025-01-15' },
    { id: 2, title: 'React Crash Course', date: '2025-02-10' },
    { id: 3, title: 'Python for Data Science', date: '2025-03-05' },
  ];

  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [shownCertificates, setShownCertificates] = useState({});
  const [notification, setNotification] = useState('');

  // Load saved ratings and feedbacks from localStorage
  useEffect(() => {
    const savedRatings = {};
    const savedFeedbacks = {};
    
    completedWorkshops.forEach((workshop) => {
      const savedRating = localStorage.getItem(`rating_${workshop.id}`);
      const savedFeedback = localStorage.getItem(`feedback_${workshop.id}`);
      
      if (savedRating) savedRatings[workshop.id] = parseInt(savedRating, 10);
      if (savedFeedback) savedFeedbacks[workshop.id] = savedFeedback;
    });
    
    setRatings(savedRatings);
    setFeedbacks(savedFeedbacks);
  }, []);

  const handleRate = (id, value) => {
    setRatings((prev) => {
      const newRatings = { ...prev, [id]: value };
      localStorage.setItem(`rating_${id}`, value);  // Save rating to localStorage
      return newRatings;
    });
  };

  const handleFeedbackChange = (id, text) => {
    setFeedbacks((prev) => {
      const newFeedbacks = { ...prev, [id]: text };
      localStorage.setItem(`feedback_${id}`, text);  // Save feedback to localStorage
      return newFeedbacks;
    });
  };

  const handleSaveFeedback = (id) => {
    // Show notification
    setNotification('Feedback has been saved!');

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(''), 3000);
  };

  const toggleCertificate = (id) => {
    setShownCertificates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Completed Workshops</h2>

      {completedWorkshops.map((workshop) => (
        <div key={workshop.id} className="dashboard-section card">
          <h4 className="card-header">{workshop.title}</h4>
          <p>Date: {workshop.date}</p>

          {/* Button to toggle visibility of certificate */}
          <div>
            <button 
              onClick={() => toggleCertificate(workshop.id)} 
              className="btn-primary"
            >
              {shownCertificates[workshop.id] ? 'Hide Certificate' : 'View Certificate'}
            </button>
          </div>

          {/* Display certificate if it's toggled */}
          {shownCertificates[workshop.id] && (
            <div className="certificate-section">
              <h2>Certificate of Attendance</h2>
              <p>This is to certify that <strong>John Doe</strong> has attended the workshop:</p>
              <h3>“{workshop.title}”</h3>
              <p>Date: {workshop.date}</p>
            </div>
          )}

          {/* Rating system */}
          <div className="rating-container">
            <p>Rate this Workshop:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${ratings[workshop.id] >= star ? 'rated' : ''}`}
                onClick={() => handleRate(workshop.id, star)}
                onMouseEnter={() => setRatings((prev) => ({ ...prev, [workshop.id]: star }))}
                onMouseLeave={() => setRatings((prev) => ({ ...prev, [workshop.id]: ratings[workshop.id] }))}
              >
                ★
              </span>
            ))}
          </div>

          {/* Feedback section */}
          <textarea
            className="input feedback-textarea"
            placeholder="Leave feedback..."
            value={feedbacks[workshop.id] || ''}
            onChange={(e) => handleFeedbackChange(workshop.id, e.target.value)}
          />
          <button
            onClick={() => handleSaveFeedback(workshop.id)}
            className="btn-secondary save-feedback-btn"
            disabled={!feedbacks[workshop.id]}
          >
            Save Feedback
          </button>

          {/* Display notification */}
          {notification && (
            <div className="notification">
              {notification}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => navigate('/workshop')}
        className="btn-outline back-button"
      >
        ← Back to Workshop Page
      </button>
    </div>
  );
}
