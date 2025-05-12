import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const allowedUsers = {
    student: [
      { email: 'student1@test.com', password: '123' },
      { email: 'student2@test.com', password: '123' }
    ],
    company: [
      { email: 'company1@test.com', password: '123' },
      { email: 'company2@test.com', password: '123' }
    ],
    admin: [
      { email: 'admin1@test.com', password: '123' },
      { email: 'admin2@test.com', password: '123' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = allowedUsers[role].some(
      (user) => user.email === email && user.password === password
    );
    if (valid) {
      setError('');
      if (role === 'company') navigate('/company');
      else if (role === 'student') navigate('/Student');
      else if (role === 'admin') navigate('/SCAD'); // Change if needed
    } else {
      setError('Invalid credentials for selected role.');
    }
  };

  const handleRegister = () => {
    navigate('/company/register');
  };

  return (
    <main className="form-container">
      <section className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-header">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="label">Role</label>
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="btn-primary">Login</button>
          
          {role === 'company' && (
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={handleRegister}
              style={{ marginTop: '10px' }}
            >
              Register as Company
            </button>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
