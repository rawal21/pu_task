// src/components/Dashboard.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'User' };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}!</h1>
      <div className="dashboard-content">
        <p>This is your dashboard where you can manage your tasks and view your progress.</p>
        <button className="logout-button btn btn-dangar" onClick={handleLogout}>Logout</button>

      </div>
    </div>
  );
};

export default Dashboard;
