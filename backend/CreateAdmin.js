// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    const name = 'Admin';

    const existing = await User.findOne({ email });

    if (existing) {
      console.log('❌ Admin already exists');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const adminUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
    }

    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
