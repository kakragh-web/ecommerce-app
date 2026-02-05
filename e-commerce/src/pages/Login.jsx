import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === 'admin@evalet.com' && formData.password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    } else if (formData.email === 'user@evalet.com' && formData.password === 'user123') {
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    } else {
      alert('Invalid credentials. Try:\nAdmin: admin@evalet.com / admin123\nUser: user@evalet.com / user123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          background: 'var(--primary-color)',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h2><i className="fas fa-shopping-bag me-2"></i>eValet</h2>
          <p className="mb-0">Welcome Back!</p>
        </div>
        <div style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '10px',
                  border: '2px solid #eee',
                  padding: '12px 15px'
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '10px',
                  border: '2px solid #eee',
                  padding: '12px 15px'
                }}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="remember"
                className="form-check-input"
                id="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="btn" style={{
              background: 'var(--primary-color)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              width: '100%',
              color: 'white',
              fontWeight: 'bold'
            }}>
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </button>
          </form>
          
          <div className="text-center mt-3">
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </div>
          
          <div className="text-center mt-4">
            <p>Don't have an account? <a href="/register" className="text-decoration-none">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;