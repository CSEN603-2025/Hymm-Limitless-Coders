import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Meeting.css';

export default function Meeting() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', status: 'in meeting' },
    { id: 2, name: 'Bob', status: 'in meeting' },
    { id: 3, name: 'Charlie', status: 'in meeting' },
    { id: 4, name: 'David', status: 'left' },
    { id: 5, name: 'Eve', status: 'left' },
  ]);

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [muted, setMuted] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [notification, setNotification] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.name === 'Charlie'
            ? { ...user, status: 'left' }
            : user
        )
      );
    }, 5000);
  }, []);

  useEffect(() => {
    const leftUser = users.find(user => user.status === 'left');
    if (leftUser) {
      const newNotification = `${leftUser.name} has left the call`;
      setNotification(newNotification);

      const id = setTimeout(() => {
        setNotification('');
      }, 4000);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setTimeoutId(id);
    }
  }, [users]);

  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleMute = () => setMuted(!muted);
  const toggleScreenShare = () => setScreenSharing(!screenSharing);

  const leaveCall = () => {
    setNotification('You have left the call.');
    navigate('/prostudentextras');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Meeting Room</h2>

      {notification && (
        <div className="notification-banner1 card1">
          {notification}
        </div>
      )}

      <div className="dashboard-section card">
        <h3 className="card-header">Video Section</h3>
        <p>{videoEnabled ? 'Video On' : 'Video Off'}</p>
        <div className={`video-feed ${videoEnabled ? 'show' : 'hide'}`}>
          <p>Main Video Feed</p>
        </div>
        <div className="link-group">
          <button className="btn-outline" onClick={toggleVideo}>{videoEnabled ? 'Turn Off Video' : 'Turn On Video'}</button>
          <button className="btn-outline" onClick={toggleMute}>{muted ? 'Unmute' : 'Mute'}</button>
          <button className="btn-outline" onClick={toggleScreenShare}>{screenSharing ? 'Stop Screen Share' : 'Share Screen'}</button>
          <button className="btn-primary" onClick={leaveCall}>Leave Call</button>
        </div>
      </div>

      <div className="dashboard-section card">
        <h3 className="card-header">Participants</h3>
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user.id}
              className={`user-item ${user.status === 'in meeting' ? 'in-meeting' : 'left'}`}
            >
              {user.name} <span className="status">{user.status === 'in meeting' ? '(In Meeting)' : '(Left the Call)'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}