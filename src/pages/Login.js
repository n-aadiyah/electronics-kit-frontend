import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('❌ Please fill in all fields.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true } // needed for cookie-based sessions
      );

      alert('✅ Login successful!');
      navigate('/home'); // or your home/dashboard route
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('❌ Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
