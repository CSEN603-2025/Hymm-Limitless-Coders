import React, { useState, useEffect } from 'react';

const dummyWorkshops = [
  { id: 'ws1', title: 'React Fundamentals' },
  { id: 'ws2', title: 'Advanced CSS Techniques' },
  { id: 'ws3', title: 'Debugging in JavaScript' },
];

const dummyMessages = [
  { user: 'Alice', text: 'Welcome everyone!' },
  { user: 'Bob', text: 'Excited to be here!' },
  { user: 'Instructor', text: 'Let’s begin the session.' },
];

export default function LiveWorkshopPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [showNotification, setShowNotification] = useState('');

  useEffect(() => {
    if (selectedWorkshop) {
      setMessages([]);
      let index = 0;
      const interval = setInterval(() => {
        if (index < dummyMessages.length) {
          const msg = dummyMessages[index];
          const timestamp = new Date().toLocaleTimeString();
          setMessages(prev => [...prev, { ...msg, timestamp }]);
          setShowNotification(`${msg.user} sent a message`);
          setTimeout(() => setShowNotification(''), 2000);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedWorkshop]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prev => [...prev, { user: 'You', text: inputMessage, timestamp }]);
    setInputMessage('');
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`notes-${selectedWorkshop.id}`, notes);
    alert('Notes saved!');
  };

  if (!selectedWorkshop) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Live Workshops</h2>
        <div className="card">
          {dummyWorkshops.map(ws => (
            <div key={ws.id} className="dashboard-section">
              <h3 className="card-header">{ws.title}</h3>
              <button className="btn-primary" onClick={() => setSelectedWorkshop(ws)}>
                Join
              </button>
            </div>
          ))}
        </div>
        <SavedNotesSelector />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">{selectedWorkshop.title} - Live Chat</h2>

      {showNotification && (
        <div style={{ backgroundColor: '#DBEAFE', padding: '8px', borderRadius: '6px', marginBottom: '12px', color: '#1E3A8A' }}>
          {showNotification}
        </div>
      )}

      <div className="card" style={{ marginBottom: '24px' }}>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.user}</strong> ({msg.timestamp}): {msg.text}
          </p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          className="input"
          placeholder="Type a message"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
        />
        <button className="btn-secondary" onClick={handleSendMessage}>Send</button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <label className="label">Your Notes</label>
        <textarea
          className="input"
          value={notes}
          rows="5"
          placeholder="Take your notes here..."
          onChange={e => setNotes(e.target.value)}
        />
        <button className="btn-primary" style={{ marginTop: '12px' }} onClick={handleSaveNotes}>
          Save Notes
        </button>
      </div>

      <button className="btn-outline" onClick={() => setSelectedWorkshop(null)}>
        Leave Live Chat
      </button>
    </div>
  );
}

function SavedNotesSelector() {
  const [selectedId, setSelectedId] = useState('');
  const [viewedNote, setViewedNote] = useState('');

  const handleView = () => {
    const saved = localStorage.getItem(`notes-${selectedId}`);
    setViewedNote(saved || 'No notes found.');
  };

  return (
    <div className="card" style={{ marginTop: '24px' }}>
      <h3 className="card-header">View Saved Notes</h3>
      <select className="input" onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
        <option value="">Select Workshop</option>
        {dummyWorkshops.map(ws => (
          <option key={ws.id} value={ws.id}>{ws.title}</option>
        ))}
      </select>
      <button
        className="btn-outline"
        style={{ marginTop: '12px' }}
        onClick={handleView}
        disabled={!selectedId}
      >
        View
      </button>
      {viewedNote && (
        <div style={{ marginTop: '16px' }}>
          <strong>Saved Notes:</strong>
          <p>{viewedNote}</p>
        </div>
      )}
    </div>
  );
}
