import React, { useState } from 'react';
import NaggarRoutes from '../NaggarRoutes';
import './notification.css';

const NotificationPage = () => {
  // Dummy notifications data with appointment responses
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      student: "Emma Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      response: "accepted",
      appointmentDate: "May 12, 2025",
      appointmentTime: "10:30 AM - 11:30 AM",
      course: "Advanced Mathematics",
      message: "Looking forward to discussing my project progress!",
      timestamp: "Today, 9:15 AM",
      isRead: false
    },
    {
      id: 2,
      student: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      response: "rejected",
      appointmentDate: "May 13, 2025",
      appointmentTime: "2:00 PM - 3:00 PM",
      course: "Computer Science 101",
      message: "Sorry, I have a conflicting schedule. Can we reschedule?",
      timestamp: "Today, 8:42 AM",
      isRead: false
    },
    {
      id: 3,
      student: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      response: "accepted",
      appointmentDate: "May 14, 2025",
      appointmentTime: "1:15 PM - 2:15 PM",
      course: "Introduction to Psychology",
      message: "Thank you for the availability. I'll be prepared with my questions.",
      timestamp: "Yesterday, 4:30 PM",
      isRead: true
    },
    {
      id: 4,
      student: "Ethan Brown",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      response: "rejected",
      appointmentDate: "May 12, 2025",
      appointmentTime: "3:45 PM - 4:45 PM",
      course: "World History",
      message: "I need to reschedule due to a family emergency.",
      timestamp: "Yesterday, 2:18 PM",
      isRead: true
    },
    {
      id: 5,
      student: "Olivia Davis",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      response: "accepted",
      appointmentDate: "May 15, 2025",
      appointmentTime: "11:00 AM - 12:00 PM",
      course: "Business Ethics",
      message: "I've prepared all the required materials. See you then!",
      timestamp: "May 9, 2025, 10:05 AM",
      isRead: true
    }
  ]);

  // Filter states
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Filter notifications based on current filters
  const filteredNotifications = notifications.filter(notification => {
    // Filter by type (accepted/rejected/all)
    if (filterType !== 'all' && notification.response !== filterType) {
      return false;
    }

    // Filter by search query (student name, course)
    if (searchQuery && 
        !(notification.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
        notification.course.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    return true;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="page-container">
      {/* Navigation */}
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Notifications</h1>
          <div className="notification-badge">{unreadCount}</div>
        </section>

        <div className="notification-controls">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by student or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notifications"
            />
          </div>

          <div className="filter-container">
            <button 
              className={`filter-button ${filterType === 'all' ? 'filter-active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`filter-button ${filterType === 'accepted' ? 'filter-active' : ''}`}
              onClick={() => setFilterType('accepted')}
            >
              Accepted
            </button>
            <button 
              className={`filter-button ${filterType === 'rejected' ? 'filter-active' : ''}`}
              onClick={() => setFilterType('rejected')}
            >
              Rejected
            </button>
          </div>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                className={`notification-card ${!notification.isRead ? 'notification-unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-avatar">
                  <img src={notification.avatar} alt={notification.student} />
                  <span className={`response-indicator ${notification.response}`}></span>
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h3 className="student-name">{notification.student}</h3>
                    <span className="notification-time">{notification.timestamp}</span>
                  </div>
                  <div className="notification-body">
                    <p className="notification-message">
                      <span className="response-text">
                        {notification.response === 'accepted' ? 'Accepted' : 'Declined'}
                      </span> your video call appointment for <span className="highlight">{notification.course}</span> on <span className="highlight">{notification.appointmentDate}</span> at <span className="highlight">{notification.appointmentTime}</span>.
                    </p>
                    <p className="student-message">"{notification.message}"</p>
                  </div>
                  <div className="notification-actions">
                    {notification.response === 'accepted' ? (
                      <button className="btn-primary">Join Call</button>
                    ) : (
                      <button className="btn-secondary">Reschedule</button>
                    )}
                    <button className="btn-outline">Message</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No notifications found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>

        <div className="pagination">
          <button className="pagination-btn">&laquo;</button>
          <button className="pagination-btn pagination-active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">&raquo;</button>
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;