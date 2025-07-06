import React, { useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [form, setForm] = useState({
    userEmail: '',
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/ticket', form);
      alert(res.data.message);
      setForm({ userEmail: '', title: '', description: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Ticket submission failed');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="userEmail"
          placeholder="Your Email"
          value={form.userEmail}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="description"
          placeholder="Describe your issue"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea><br /><br />
        <button type="submit">Raise Ticket</button>
      </form>
    </div>
  );
};

export default Dashboard;
