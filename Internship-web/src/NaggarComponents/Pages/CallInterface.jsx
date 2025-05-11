import { useState, useEffect } from 'react';
import NaggarRoutes from '../NaggarRoutes';
import './callInterface.css';

// Dummy data for call history
const dummyCallHistory = [
  {
    id: 1,
    caller: 'Dr. Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    time: '10:30 AM',
    date: '2024-03-15',
    status: 'accepted',
    duration: '45 minutes'
  },
  {
    id: 2,
    caller: 'Prof. Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    time: '2:15 PM',
    date: '2024-03-14',
    status: 'rejected',
    reason: 'Busy with another meeting'
  },
  {
    id: 3,
    caller: 'Dr. Emily Brown',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    time: '11:00 AM',
    date: '2024-03-13',
    status: 'accepted',
    duration: '30 minutes'
  }
];

function CallInterface({ addNotification }) {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callHistory, setCallHistory] = useState(dummyCallHistory);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Simulate incoming call after 3 seconds
    const timer = setTimeout(() => {
      setIncomingCall({
        id: 4,
        caller: 'Dr. Smith',
        avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      });
      addNotification('Incoming call from Dr. Smith');
    }, 3000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  const handleAcceptCall = () => {
    addNotification('Call accepted');
    setCallHistory(prev => [{
      id: incomingCall.id,
      caller: incomingCall.caller,
      avatar: incomingCall.avatar,
      time: incomingCall.time,
      date: incomingCall.date,
      status: 'accepted',
      duration: '0 minutes'
    }, ...prev]);
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    addNotification('Call rejected');
    setCallHistory(prev => [{
      id: incomingCall.id,
      caller: incomingCall.caller,
      avatar: incomingCall.avatar,
      time: incomingCall.time,
      date: incomingCall.date,
      status: 'rejected',
      reason: 'User rejected'
    }, ...prev]);
    setIncomingCall(null);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    addNotification(`Status changed to ${!isOnline ? 'online' : 'offline'}`);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <NaggarRoutes className="navbar" />
      </header>

      <main className="content-area" role="main">
        <section className="section-header">
          <h1 className="page-title">Call Interface</h1>
          <div className="call-status">
            <div className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}></div>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
            <button 
              className="btn-secondary"
              onClick={toggleOnlineStatus}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </section>

        <div className="call-interface">
          {incomingCall ? (
            <div className="incoming-call">
              <div className="caller-info">
                <img 
                  src={incomingCall.avatar} 
                  alt={incomingCall.caller} 
                  className="caller-avatar"
                />
                <div className="caller-details">
                  <h3 className="caller-name">{incomingCall.caller}</h3>
                  <p className="call-time">{incomingCall.time}</p>
                </div>
              </div>
              <div className="call-actions">
                <button className="btn-primary" onClick={handleAcceptCall}>
                  <span>Accept Call</span>
                </button>
                <button className="btn-danger" onClick={handleRejectCall}>
                  <span>Reject Call</span>
                </button>
              </div>
            </div>
          ) : (
            <p>No active calls</p>
          )}
        </div>

        <div className="call-history">
          <h2 className="call-history-title">Call History</h2>
          <div className="call-history-list">
            {callHistory.map(call => (
              <div key={call.id} className="call-history-item">
                <img 
                  src={call.avatar} 
                  alt={call.caller} 
                  className="call-history-avatar"
                />
                <div className="call-history-details">
                  <div className="call-history-name">{call.caller}</div>
                  <div className="call-history-time">
                    {call.date} at {call.time}
                  </div>
                </div>
                <div className={`call-history-status status-${call.status}`}>
                  {call.status === 'accepted' ? `Duration: ${call.duration}` : 'Rejected'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CallInterface;