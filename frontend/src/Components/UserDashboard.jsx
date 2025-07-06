/* import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [form, setForm] = useState({
    userName: '',
    userEmail: '',
    contactNumber: '',
    courseName: 'AWS',
    concern: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // 🧠 Auto-fill from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setForm((prev) => ({
        ...prev,
        userName: storedUser.name || '',
        userEmail: storedUser.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/ticket', form);
      setMessage(res.data.message);
      setForm((prev) => ({
        userName: prev.userName,
        userEmail: prev.userEmail,
        contactNumber: '',
        courseName: 'AWS',
        concern: ''
      }));
    } catch (err) {
      console.error('Ticket submission error:', err);
      setMessage('❌ Ticket submission failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>  Raise a Ticket</h2>
      {message && <p style={{ color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          value={form.userName}
          disabled
          placeholder="Name"
          style={inputStyle}
        />
        <input
          type="email"
          name="userEmail"
          value={form.userEmail}
          disabled
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          required  
          style={inputStyle}
        />
        <select
          name="courseName"
          value={form.courseName}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="AWS">AWS</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Python">Python</option>
        </select>
        <textarea
          name="concern"
          placeholder="Write your concern here..."
          value={form.concern}
          onChange={handleChange}
          required
          rows="4"
          style={inputStyle}
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px'
};

export default UserDashboard;
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [form, setForm] = useState({
    userName: '',
    userEmail: '',
    contactNumber: '',
    courseName: 'AWS',
    concern: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setForm(prev => ({
        ...prev,
        userName: storedUser.name || '',
        userEmail: storedUser.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/ticket', form);
      setMessage(res.data.message);
      setForm(prev => ({
        userName: prev.userName,
        userEmail: prev.userEmail,
        contactNumber: '',
        courseName: 'AWS',
        concern: ''
      }));
    } catch (err) {
      console.error('Ticket submission error:', err);
      setMessage('❌ Ticket submission failed');
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="ticket-card">
        <h2>📩 Raise a Ticket</h2>
        <p className="subtext">Submit your concern and we’ll get back to you shortly.</p>
        {message && <p className={`status-msg ${message.includes('❌') ? 'error' : 'success'}`}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="userName" value={form.userName} disabled />

          <label>Email</label>
          <input type="email" name="userEmail" value={form.userEmail} disabled />

          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Enter contact number"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />

          <label>Course</label>
          <select name="courseName" value={form.courseName} onChange={handleChange} required>
            <option value="AWS">AWS</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Python">Python</option>
          </select>

          <label>Concern</label>
          <textarea
            name="concern"
            placeholder="Write your concern..."
            value={form.concern}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
