// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Component/Login";
import Signup from "./Component/Signup"
import Lannding from './Component/Landing';
import Dashboard from './Component/DashBoard';

import './App.css';

const App = () => {


  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<Lannding/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
