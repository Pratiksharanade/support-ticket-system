import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
const Landing = () => {
  return (
<div className="landing-container">        
  <h1>Welcome to the Support Ticket System</h1>
  <div className="button-group" style={{ marginTop: '2rem' }}>
    <div className="button-group">
  <Link to="/login" className="route-button">User Login</Link>
  <Link to="/register" className="route-button">Register</Link>
  <Link to="/admin-login" className="route-button">Admin Login</Link>
</div>

  </div>
</div>
    
  );
};

export default Landing;
