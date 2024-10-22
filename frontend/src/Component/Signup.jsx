// src/components/SignupForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './FormStyle.css';  

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    gmail: '', // Updated field name
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
      const { username, gmail, password } = formData; // Updated to match the new field name
      const response = await axios.post('http://localhost:3000/signup', { 
        username,
        gmail, // Updated field name
        password
      });

      const user = response.data.user;

      // Check if user is undefined before redirecting
      if (!user) {
        throw new Error("User is undefined");
      }

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard
      navigate(`/dashboard`, { state: { username } }); // Pass username to dashboard
    } catch (error) {
      console.error('Error during sign up:', error.response ? error.response.data : error.message);
      setError('Signup failed. Please check your details and try again.'); // Set error message
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <div className="form-group">
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Enter your name" 
          required 
        />
      </div>
      <div className="form-group">
        <label>Gmail:</label> {/* Updated label */}
        <input 
          type="email" 
          name="gmail" // Updated field name
          value={formData.gmail} 
          onChange={handleChange} 
          placeholder="Enter your gmail" 
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
      <button type="submit" className="btn2">Sign Up</button>
      <p className='text-white mt-2'>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
  );
};

export default Signup;
