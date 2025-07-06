
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // ✅ correct path
const ticketRoutes = require('./routes/ticketRoutes'); // 
const User = require('./models/User');
const Ticket = require('./models/Ticket'); // ✅ Add this line


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/tickets', ticketRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// User Schema
/*
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
*/


// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
      role: user.role // 👈 important
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




app.get('/api/tickets/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const tickets = await Ticket.find({ userEmail });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ message: 'Failed to get user tickets' });
  }
});


//ticket schema
app.post('/api/ticket', async (req, res) => {
  try {
    const { userEmail, contactNumber, courseName, concern } = req.body;

    const newTicket = new Ticket({
      userEmail,
      contactNumber,
      courseName,
      concern
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket raised successfully' });
  } catch (err) {
    console.error('Ticket creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET all tickets (admin use)
app.get('/api/admin/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('Failed to fetch tickets:', err);
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});

app.put('/api/ticket/:id/mark', async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Count closed tickets to generate ticketNo
    const count = await Ticket.countDocuments({ status: 'closed' });

    const updated = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: 'closed',
        ticketNo: `TICKET${String(count + 1).padStart(3, '0')}`
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Ticket not found' });

    res.json({ message: 'Ticket marked as closed', ticket: updated });
  } catch (err) {
    console.error('Mark error:', err);
    res.status(500).json({ message: 'Failed to mark ticket' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
