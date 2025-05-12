import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkshopRecordings() {
  const navigate = useNavigate();

  const recordings = [
    { id: 1, title: 'JavaScript Essentials', date: '2025-01-20', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'React Basics', date: '2025-02-12', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
  ];

  const videoRefs = useRef({});

  const handlePlayPause = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Recorded Workshops</h2>

      {recordings.map((rec) => (
        <div key={rec.id} className="card">
          <div className="card-header">
            <h3>{rec.title}</h3>
            <p className="text-sm text-gray-500">Date: {rec.date}</p>
          </div>

          <video
            ref={(el) => (videoRefs.current[rec.id] = el)}
            width="100%"
            controls={false}
            className="w-full rounded-lg mb-4"
            src={rec.videoUrl}
          />

          <button
            className="btn-primary"
            onClick={() => handlePlayPause(rec.id)}
          >
            Play / Pause
          </button>
        </div>
      ))}

      <button
        onClick={() => navigate('/workshop')}
        className="btn-outline mt-8"
      >
        ← Back to Workshop Page
      </button>
    </div>
  );
}
