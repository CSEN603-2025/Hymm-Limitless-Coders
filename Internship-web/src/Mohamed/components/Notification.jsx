// components/Notification.js
import React from 'react';

const Notification = ({ message }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: 'lightgreen', marginTop: '20px' }}>
      <strong>Notification:</strong> {message}
    </div>
  );
};

export default Notification;
