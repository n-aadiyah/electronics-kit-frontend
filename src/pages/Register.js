import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirm) {
      setError('❌ Please fill in all fields.');
      return;
    }

    if (password !== confirm) {
      setError('❌ Passwords do not match.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/auth/register',
        { username, email, password },
        { withCredentials: true }
      );

      alert('✅ Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('❌ Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
