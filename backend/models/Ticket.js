

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userEmail: String,
  contactNumber: String,
  courseName: String,
  concern: String,
  status: { type: String, default: 'open' },
  ticketNo: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
