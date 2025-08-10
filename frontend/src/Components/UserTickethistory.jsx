import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserTickethistory.css';

const UserTicketHistory = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      fetchTickets(user.email);
    } else {
      navigate('/login'); // redirect if not logged in
    }
  }, [navigate]);

  const fetchTickets = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tickets/${email}`);
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching ticket history:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="ticket-history-container">
      <div className="ticket-header">
        <h2>Your Ticket History</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Concern</th>
              <th>Status</th>
              <th>Ticket No</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.courseName}</td>
                <td>{ticket.concern}</td>
                <td>{ticket.status}</td>
                <td>{ticket.ticketNo || '-'}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTicketHistory;
