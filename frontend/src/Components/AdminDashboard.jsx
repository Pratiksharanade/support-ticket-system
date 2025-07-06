/* import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tickets');
      setTickets(res.data);
    } catch (err) {
      alert('Failed to load tickets');
      console.error(err);
    }
  };

  const markAsResolved = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/ticket/${id}/mark`);
    // Filter out the resolved ticket
    setTickets(prev => prev.filter(ticket => ticket._id !== id));
  } catch (err) {
    alert('Failed to mark ticket');
    console.error(err);
  }
};

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Admin Dashboard</h2>
      {tickets.map(ticket => (
        <div key={ticket._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Email:</strong> {ticket.userEmail}</p>
          <p><strong>Title:</strong> {ticket.title}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          {ticket.ticketNo && <p><strong>Ticket No:</strong> {ticket.ticketNo}</p>}
          {ticket.status === 'open' && (
            <button onClick={() => markAsResolved(ticket._id)}>Mark as Resolved</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './AdminDashboard.css'; // Link to the CSS

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/tickets');
      setTickets(res.data);
    } catch (err) {
      alert('Failed to load tickets');
      console.error(err);
    }
  };
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token'); // if you're storing auth token
  alert('Logged out successfully');
  navigate('/admin-login');
};


  const markAsResolved = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/ticket/${id}/mark`);
      setTickets(prev => prev.filter(ticket => ticket._id !== id));
    } catch (err) {
      alert('Failed to mark ticket');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>

      </nav>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Course</th>
            <th>Concern</th>
            <th>Status</th>
            <th>Ticket No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.userEmail}</td>
              <td>{ticket.courseName || '-'}</td>
              <td>{ticket.concern || '-'}</td>
              <td>{ticket.status}</td>
              <td>{ticket.ticketNo || '-'}</td>
              <td>
                {ticket.status === 'open' && (
                  <button onClick={() => markAsResolved(ticket._id)}>Resolve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
