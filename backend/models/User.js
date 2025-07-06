// models/User.js
/*
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    default: 'user', // default role is user
    enum: ['user', 'admin'] // only allowed values
  }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
