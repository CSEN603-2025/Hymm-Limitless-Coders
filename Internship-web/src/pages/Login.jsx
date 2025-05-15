import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
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

      console.log(e.target)
      let loggedInUser={
        "name":"",
        "email":email
      }
      localStorage.setItem('userProfile',JSON.stringify(loggedInUser));


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
    <main className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="role">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select user role"
            >
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-primary">Login</button>
          </div>
            
          {role === 'company' && (
            <div className="register-link">
              <button
                type="button"
                className="btn-outline"
                onClick={handleRegister}
              >
                Register as Company
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
