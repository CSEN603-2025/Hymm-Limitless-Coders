import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function CompletedWorkshopsPage() {
  const navigate = useNavigate();

  const completedWorkshops = [
    { id: 1, title: 'Intro to HTML', date: '2025-01-15' },
    { id: 2, title: 'React Crash Course', date: '2025-02-10' },
    { id: 3, title: 'Python for Data Science', date: '2025-03-05' },
  ];

  const [ratings, setRatings] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [notification, setNotification] = useState('');

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
      localStorage.setItem(`rating_${id}`, value);
      return newRatings;
    });
  };

  const handleFeedbackChange = (id, text) => {
    setFeedbacks((prev) => {
      const newFeedbacks = { ...prev, [id]: text };
      localStorage.setItem(`feedback_${id}`, text);
      return newFeedbacks;
    });
  };

  const handleSaveFeedback = (id) => {
    setNotification('Feedback has been saved!');
    setTimeout(() => setNotification(''), 3000);
  };

  const downloadCertificate = (workshop) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Certificate of Attendance', 20, 30);
    doc.setFontSize(14);
    doc.text(`This is to certify that John Doe has attended the workshop:`, 20, 50);
    doc.setFontSize(16);
    doc.text(`"${workshop.title}"`, 20, 60);
    doc.setFontSize(12);
    doc.text(`Date: ${workshop.date}`, 20, 70);
    doc.save(`${workshop.title.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Completed Workshops</h2>

      {completedWorkshops.map((workshop) => (
        <div key={workshop.id} className="dashboard-section card">
          <h4 className="card-header">{workshop.title}</h4>
          <p>Date: {workshop.date}</p>

          <div>
            <button 
              onClick={() => downloadCertificate(workshop)} 
              className="btn-primary"
            >
              Download Certificate
            </button>
          </div>
<div className="rating-container">
  <p>Rate this Workshop:</p>
  {[1, 2, 3, 4, 5].map((star) => {
    const currentRating = hoveredRatings[workshop.id] || ratings[workshop.id] || 0;
    return (
      <span
        key={star}
        style={{
          cursor: 'pointer',
          fontSize: '24px',
          color: currentRating >= star ? 'gold' : 'gray',
          marginRight: '5px',
        }}
        onClick={() => handleRate(workshop.id, star)}
        onMouseEnter={() =>
          setHoveredRatings((prev) => ({ ...prev, [workshop.id]: star }))
        }
        onMouseLeave={() =>
          setHoveredRatings((prev) => {
            const newHovered = { ...prev };
            delete newHovered[workshop.id];
            return newHovered;
          })
        }
      >
        ★
      </span>
    );
  })}
</div>



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
