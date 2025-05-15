
// src/components/WorkshopRegistration.js
import React, { useState } from 'react';

export default function WorkshopRegistration({ workshop }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationStatus(`Successfully registered for ${workshop.title}`);
  };

  if (!workshop) return null;

  return (
    <div style={{ width: '50%', margin: 'auto', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#4CAF50' }}>Register for {workshop.title}</h2>
      {registrationStatus ? (
        <p style={{ color: '#3ca35d' }}>{registrationStatus}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                padding: '8px',
                width: '80%',
                marginTop: '5px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '8px',
                width: '80%',
                marginTop: '5px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3ca35d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
}
