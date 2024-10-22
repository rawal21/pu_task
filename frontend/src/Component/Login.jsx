// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './FormStyle.css';  

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submitting

    try {
      const { username, password } = formData; 
      console.log('Form Data:', formData); // Log the form data

      const response = await axios.post('https://pu-task-2.onrender.com/api/login', { 
        username,
        password,
        deviceInfo: navigator.userAgent,
      });

      console.log('Response:', response.data); // Log the response
      const user = response.data.user; // Assuming the response contains user info

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User stored in local storage:', user); // Log user storage

      // Redirect to dashboard with the username
      console.log('User logged in, redirecting to dashboard...');
      navigate(`/dashboard`, { state: { username } }); // Pass the username to the dashboard
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your credentials.'); // Set error message
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="btn2">Login</button>
      <p className='text-white mt-2'>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </form>
  );
};

export default Login;
