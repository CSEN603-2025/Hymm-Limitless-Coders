import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpcomingWorkshopsPage() {
  const navigate = useNavigate();

  const upcomingWorkshops = [
    { id: 1, title: 'Advanced JavaScript', date: '2025-05-25', description: 'Dive deep into JavaScript concepts like closures, promises, and async/await. Learn to build more complex applications using advanced techniques.' },
    { id: 2, title: 'Mastering CSS', date: '2025-06-05', description: 'Master CSS Grid, Flexbox, animations, and transitions. Learn how to create stunning and responsive web layouts.' },
    { id: 3, title: 'React Advanced Topics', date: '2025-06-15', description: 'Explore advanced React patterns, hooks, state management with Redux, and how to optimize React applications.' },
  ];

  const [userData, setUserData] = useState({ username: '', password: '' });
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
  const [showDescription, setShowDescription] = useState(null);
  const [upcomingNotification, setUpcomingNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = (workshopId) => {
    const { username, password } = userData;
    
    if (!username || !password) {
      setRegistrationStatus('Please enter both username and password.');
      return;
    }

    const registeredWorkshops = JSON.parse(localStorage.getItem('registeredWorkshops')) || {};
    if (registeredWorkshops[workshopId]) {
      setRegistrationStatus('You have already registered for this workshop.');
    } else {
      registeredWorkshops[workshopId] = { username, password };
      localStorage.setItem('registeredWorkshops', JSON.stringify(registeredWorkshops));
      setRegistrationStatus('Registration successful!');
    }
  };

  const handleWorkshopSelect = (workshopId) => {
    setSelectedWorkshopId(workshopId);
    setRegistrationStatus('');
    setUserData({ username: '', password: '' });
  };

  const handleBackToWorkshopPage = () => {
    setSelectedWorkshopId(null);
  };

  const toggleDescription = (workshopId) => {
    setShowDescription((prev) => (prev === workshopId ? null : workshopId));
  };

  const notifyUpcomingWorkshop = () => {
    const currentDate = new Date();
    
    upcomingWorkshops.forEach((workshop) => {
      const workshopDate = new Date(workshop.date);
      const timeDifference = workshopDate - currentDate;
      
      if (timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000) {
        setUpcomingNotification(`Upcoming Workshop: ${workshop.title} tomorrow (${workshop.date})!`);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(notifyUpcomingWorkshop, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Upcoming Workshops</h2>

      {upcomingNotification && (
        <div className="notification">
          {upcomingNotification}
        </div>
      )}

      {selectedWorkshopId === null ? (
        upcomingWorkshops.map((workshop) => (
          <div key={workshop.id} className="card">
            <h4>{workshop.title}</h4>
            <p>Date: {workshop.date}</p>
            <button onClick={() => handleWorkshopSelect(workshop.id)} className="btn-primary">
              Register for {workshop.title}
            </button>

            <button
              onClick={() => toggleDescription(workshop.id)}
              className="btn-secondary"
            >
              {showDescription === workshop.id ? 'Hide Description' : 'View Description'}
            </button>

            {showDescription === workshop.id && (
              <div className="description">
                <p>{workshop.description}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        upcomingWorkshops.filter((workshop) => workshop.id === selectedWorkshopId).map((workshop) => (
          <div key={workshop.id} className="card">
            <h4>Register for {workshop.title}</h4>

            <div className="form">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleInputChange}
                className="input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleInputChange}
                className="input"
              />
              <button onClick={() => handleRegister(workshop.id)} className="btn-primary">
                Register
              </button>
            </div>

            {registrationStatus && (
              <div className="notification">
                {registrationStatus}
              </div>
            )}

            <button onClick={handleBackToWorkshopPage} className="btn-outline">
              ← Back to Workshops
            </button>
          </div>
        ))
      )}

      <button onClick={() => navigate('/workshop')} className="btn-outline">
        ← Back to Workshop Page
      </button>
    </div>
  );
}
