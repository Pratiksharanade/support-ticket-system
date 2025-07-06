
const express = require('express');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 🔐 Middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// 📨 User creates ticket
router.post('/', auth, async (req, res) => {
  const { course, contact, concern } = req.body;
  const user = await User.findById(req.user.id);
  const ticket = new Ticket({
    name: user.name,
    email: user.email,
    course,
    contact,
    concern,
  });
  await ticket.save();
  res.json({ message: 'Ticket raised successfully' });
});

// 🔎 Admin gets open tickets
router.get('/admin', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const tickets = await Ticket.find({ status: { $ne: 'Closed' } });
  res.json(tickets);
});

// ✅ Admin updates status
router.put('/admin/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { status } = req.body;
  await Ticket.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: 'Ticket status updated' });
});

router.get('/', (req, res) => {
  res.send('🎉 Ticket route is working');
});

module.exports = router;
