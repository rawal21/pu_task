const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, password, gmail } = req.body;

  // Check if gmail already exists
  const gmailExists = await User.findOne({ gmail });
  if (gmailExists) {
    return res.status(400).send({ error: 'Gmail is already registered' });
  }

  const user = new User({ username, password, gmail });

  try {
    await user.save();
    const token = await user.generateAuthToken(req.body.deviceInfo);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password, deviceInfo } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    // If the user has 3 active tokens, log out the oldest device
    if (user.tokens.length === 3) {
      const token = await user.generateAuthToken(deviceInfo);
      user.tokens.shift(); // Remove the oldest token
      await user.save();
      return res.send({ message: 'Logged in and token regenerated', token });
    } else {
      const token = await user.generateAuthToken(deviceInfo);
      return res.send({ token });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Logout route
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
    await req.user.save();
    res.send({ message: 'Logged out successfully' });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
