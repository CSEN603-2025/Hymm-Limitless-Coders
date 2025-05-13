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
      { email: 'student1@test.com', password: '123' }, // Regular
      { email: 'student2@test.com', password: '123' }  // Pro
    ],
    company: [
      { email: 'company1@test.com', password: '123' },
      { email: 'company2@test.com', password: '123' }
    ],
    admin: [
      { email: 'admin1@test.com', password: '123' },
      { email: 'admin2@test.com', password: '123' }
    ],
    faculty: [
      { email: 'faculty1@test.com', password: '123' },
      { email: 'faculty2@test.com', password: '123' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = allowedUsers[role].some(
      (user) => user.email === email && user.password === password
    );

    if (valid) {
      // Store role in localStorage
      localStorage.setItem('role', role);

      // Store studentType if role is student
      if (role === 'student') {
        if (email === 'student2@test.com') {
          localStorage.setItem('role', 'prostudent');
        } else {
          localStorage.setItem('role', 'student');
        }
        navigate('/Student');
      } else if (role === 'company') {
        localStorage.setItem('role', 'company');
        navigate('/company');
      } else if (role === 'admin') {
        localStorage.setItem('role', 'scad');
        navigate('/SCAD'); // Admin dashboard
      } else if (role === 'faculty') {
        localStorage.setItem('role', 'faculty');
        navigate('/faculty/faculty/internship-reports'); // Faculty dashboard
      }

      setError('');
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
