
import React, { useState, useEffect } from 'react';
import '../Styles/notification.css';

const NotificationPage = () => {
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!['student', 'prostudent', 'scad'].includes(role)) {
      window.location.href = '/';
    }
  }, [role]);

  const getNotificationsByRole = (userRole) => {
    switch (userRole) {
      case 'student':
        return [
          // Report status notifications
          {
            id: 1,
            type: "report",
            title: "Weekly Report Status",
            message: "Your weekly progress report has been reviewed",
            status: "approved",
            feedback: "Good progress on your project milestones",
            course: "Software Engineering",
            timestamp: "Today, 11:20 AM",
            isRead: false
          },
          {
            id: 2,
            type: "report",
            title: "Monthly Report Status",
            message: "Your monthly progress report requires revision",
            status: "needs_revision",
            feedback: "Please add more details about the implementation phase",
            course: "Web Development",
            timestamp: "Yesterday, 3:45 PM",
            isRead: true
          },
          // Internship cycle notifications
          {
            id: 3,
            type: "internship",
            title: "Summer Internship Cycle Beginning",
            message: "The summer internship cycle has officially begun. Access the portal to view available positions.",
            startDate: "May 15, 2025",
            endDate: "August 15, 2025",
            timestamp: "Today, 8:00 AM",
            isRead: false
          },
          {
            id: 4,
            type: "internship",
            title: "Fall Internship Cycle Approaching",
            message: "The fall internship cycle begins in two weeks. Update your profile and prepare your applications.",
            startDate: "September 1, 2025",
            endDate: "December 15, 2025",
            timestamp: "Yesterday, 10:30 AM",
            isRead: true
          },
          // Regular students don't get appointment acceptance notifications
        ];
      case 'prostudent':
        return [
          // Appointment notifications (only for pro students)
          {
            id: 5,
            type: "appointment",
            student: "Emma Johnson",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            response: "accepted",
            appointmentDate: "May 16, 2025",
            appointmentTime: "10:30 AM - 11:30 AM",
            course: "Machine Learning",
            timestamp: "Today, 9:15 AM",
            isRead: false
          },
          {
            id: 6,
            type: "appointment",
            student: "Noah Anderson",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            response: "accepted",
            appointmentDate: "May 17, 2025",
            appointmentTime: "2:00 PM - 3:00 PM",
            course: "Data Structures",
            timestamp: "Today, 8:42 AM",
            isRead: false
          },
          {
            id: 7,
            type: "appointment",
            student: "Liam Garcia",
            avatar: "https://randomuser.me/api/portraits/men/23.jpg",
            response: "accepted",
            appointmentDate: "May 18, 2025",
            appointmentTime: "1:00 PM - 2:00 PM",
            course: "Algorithms",
            timestamp: "Today, 10:10 AM",
            isRead: false
          },
          // Report status notifications
          {
            id: 8,
            type: "report",
            title: "Final Project Report Status",
            message: "Your final project report has been approved",
            status: "approved",
            feedback: "Excellent work on the implementation and documentation",
            course: "Advanced Database Systems",
            timestamp: "Today, 2:15 PM",
            isRead: false
          },
          {
            id: 9,
            type: "report",
            title: "Research Report Status",
            message: "Your research report has been approved with comments",
            status: "approved_with_comments",
            feedback: "Strong methodology, consider expanding the literature review section",
            course: "Research Methods",
            timestamp: "Yesterday, 4:20 PM",
            isRead: true
          },
          // Internship cycle notifications (more detailed for pro students)
          {
            id: 10,
            type: "internship",
            title: "Summer Internship Cycle Beginning",
            message: "The summer internship cycle has officially begun. As a pro student, you have priority access to partner companies.",
            startDate: "May 15, 2025",
            endDate: "August 15, 2025",
            priorityDeadline: "May 25, 2025",
            featureCompanies: ["Google", "Microsoft", "Amazon"],
            timestamp: "Today, 8:00 AM",
            isRead: false
          },
          {
            id: 11,
            type: "internship",
            title: "Fall Internship Cycle Approaching",
            message: "The fall internship cycle begins in two weeks. Pro students get early access starting next week.",
            startDate: "September 1, 2025",
            earlyAccessDate: "August 25, 2025",
            endDate: "December 15, 2025",
            featureCompanies: ["Apple", "Meta", "IBM"],
            timestamp: "Yesterday, 10:30 AM",
            isRead: true
          }
        ];
      case 'scad':
        return [
          {
            id: 12,
            type: "appointment",
            student: "Sophia Davis",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg",
            response: "accepted",
            appointmentDate: "May 19, 2025",
            appointmentTime: "11:00 AM - 12:00 PM",
            course: "Thesis Discussion",
            timestamp: "Today, 5:00 PM",
            isRead: false
          }
          // Additional notifications for academic administrators
        ];
      default:
        return [];
    }
  };
  
  const [notifications, setNotifications] = useState(getNotificationsByRole(role));
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'appointment', 'report', 'internship'

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    // Filter by type if not showing all
    if (filter !== 'all' && notification.type !== filter) {
      return false;
    }
    
    // Search query filtering - different fields depending on notification type
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      // Common fields that most notifications have
      if (notification.title?.toLowerCase().includes(query) || 
          notification.message?.toLowerCase().includes(query) || 
          notification.course?.toLowerCase().includes(query)) {
        return true;
      }
      
      // Type-specific search fields
      if (notification.type === "appointment" && 
          (notification.student?.toLowerCase().includes(query) || 
           notification.appointmentDate?.toLowerCase().includes(query) ||
           notification.appointmentTime?.toLowerCase().includes(query))) {
        return true;
      }
      
      // No match found with search query
      return false;
    }
    
    // If no search query, include all notifications that match the type filter
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Group notifications by date (Today, Yesterday, Older)
  const groupNotifications = () => {
    const groups = {
      'Today': [],
      'Yesterday': [],
      'Older': []
    };
    
    filteredNotifications.forEach(notification => {
      if (notification.timestamp.startsWith('Today')) {
        groups['Today'].push(notification);
      } else if (notification.timestamp.startsWith('Yesterday')) {
        groups['Yesterday'].push(notification);
      } else {
        groups['Older'].push(notification);
      }
    });
    
    return groups;
  };
  
  const notificationGroups = groupNotifications();

  // Render appropriate content based on notification type
  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case 'appointment':
        return (
          <div className="notification-content">
            <div className="notification-header">
              <h3 className="notification-title">
                <span className="notification-type appointment">Appointment</span> 
                {notification.student}
              </h3>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
            <div className="notification-body">
              <p className="notification-message">
                <span className="response-text">Accepted</span> your video call appointment for <span className="highlight">{notification.course}</span> on <span className="highlight">{notification.appointmentDate}</span> at <span className="highlight">{notification.appointmentTime}</span>.
              </p>
            </div>
          </div>
        );
        
      case 'report':
        return (
          <div className="notification-content">
            <div className="notification-header">
              <h3 className="notification-title">
                <span className="notification-type report">Report</span> 
                {notification.title}
              </h3>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
            <div className="notification-body">
              <p className="notification-message">{notification.message}</p>
              {notification.feedback && (
                <div className="notification-feedback">
                  <p className="feedback-label">Feedback:</p>
                  <p className="feedback-text">{notification.feedback}</p>
                </div>
              )}
              {notification.course && (
                <p className="notification-course">Course: <span className="highlight">{notification.course}</span></p>
              )}
              {notification.departments && (
                <p className="notification-departments">Departments: <span className="highlight">{notification.departments.join(', ')}</span></p>
              )}
              {notification.urgentReviews && (
                <p className="notification-urgent">Urgent reviews: <span className="highlight urgent">{notification.urgentReviews}</span></p>
              )}
            </div>
          </div>
        );
        
      case 'internship':
        return (
          <div className="notification-content">
            <div className="notification-header">
              <h3 className="notification-title">
                <span className="notification-type internship">Internship</span> 
                {notification.title}
              </h3>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
            <div className="notification-body">
              <p className="notification-message">{notification.message}</p>
              {notification.startDate && notification.endDate && (
                <p className="notification-dates">Period: <span className="highlight">{notification.startDate}</span> to <span className="highlight">{notification.endDate}</span></p>
              )}
              {notification.earlyAccessDate && (
                <p className="notification-early-access">Early access: <span className="highlight">{notification.earlyAccessDate}</span></p>
              )}
              {notification.priorityDeadline && (
                <p className="notification-priority">Priority deadline: <span className="highlight">{notification.priorityDeadline}</span></p>
              )}
              {notification.featureCompanies && (
                <p className="notification-companies">Featured companies: <span className="highlight">{notification.featureCompanies.join(', ')}</span></p>
              )}
              {notification.totalApplications && (
                <div className="notification-stats">
                  <p>Applications: <span className="highlight">{notification.totalApplications}</span></p>
                  <p>Partner companies: <span className="highlight">{notification.partnerCompanies}</span></p>
                  <p>Available positions: <span className="highlight">{notification.availablePositions}</span></p>
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="notification-content">
            <div className="notification-header">
              <h3 className="notification-title">{notification.title || 'Notification'}</h3>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
            <div className="notification-body">
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        );
    }
  };

  // Render appropriate icon based on notification type
  const renderNotificationIcon = (notification) => {
    switch (notification.type) {
      case 'appointment':
        return (
          <div className="notification-avatar">
            <img src={notification.avatar} alt={notification.student} />
            <span className={`response-indicator accepted`}></span>
          </div>
        );
        
      case 'report':
        return (
          <div className="notification-icon report">
            <i className="fas fa-file-alt"></i>
            {notification.status === "approved" && <span className="status-indicator approved">✓</span>}
            {notification.status === "needs_revision" && <span className="status-indicator revision">!</span>}
            {notification.status === "approved_with_comments" && <span className="status-indicator comments">✓*</span>}
          </div>
        );
        
      case 'internship':
        return (
          <div className="notification-icon internship">
            <i className="fas fa-briefcase"></i>
          </div>
        );
        
      default:
        return (
          <div className="notification-icon default">
            <i className="fas fa-bell"></i>
          </div>
        );
    }
  };

  return (
    <div className="page-container">
      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Notifications</h1>
          <div className="notification-badge">{unreadCount}</div>
        </section>

        <div className="notification-controls">
          <button className="mark-all-read" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        <div className="notifications-list">
          {Object.keys(notificationGroups).map(group => {
            if (notificationGroups[group].length === 0) return null;
            
            return (
              <div key={group} className="notification-group">
                <h2 className="group-header">{group}</h2>
                {notificationGroups[group].map(notification => (
                  <div
                    key={notification.id}
                    className={`notification-card ${!notification.isRead ? 'notification-unread' : ''} notification-${notification.type}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {renderNotificationIcon(notification)}
                    {renderNotificationContent(notification)}
                  </div>
                ))}
              </div>
            );
          })}
          
          {filteredNotifications.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No notifications found</h3>
              <p>Try changing your search query or filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;