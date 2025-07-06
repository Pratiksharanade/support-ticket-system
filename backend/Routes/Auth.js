const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // make sure User model is created
const router = express.Router();

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Incoming registration data:', req.body);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
