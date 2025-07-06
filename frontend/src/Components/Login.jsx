
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import
import './Login.css';



const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // ✅ hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);

      // ✅ Store user and token
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      alert(res.data.message);
      console.log('Logged in user:', res.data.user);

      // ✅ Redirect to dashboard
      navigate('/user');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>User Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit"  >Login</button>
        
        <p className='help-text'>
          Don't have an account? <a href="/register">Register here</a>
        </p>
        
      </form>
    </div>
  );
};

export default Login;