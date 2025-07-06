import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Form.css'; // external CSS file

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
      console.error(err);
    }
  };
return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        <p className="helper-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
