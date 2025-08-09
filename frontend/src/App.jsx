import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import Landing from './Components/Landing';
import UserTicketHistory from './Components/UserTickethistory';

function App() {
    return (
    <div style={{ padding: '2rem',maxWidth: '500px', margin: 'auto' }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />  
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user-ticket-history" element={<UserTicketHistory />} />

      </Routes>
    </div>
  );
}

export default App;
