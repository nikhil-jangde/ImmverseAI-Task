const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
    try {
      const {username, password } = req.body;
  
      const existingUser = await User.findOne({ username});
      if (existingUser) {
        return res.status(201).json({ message: 'User already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
  
      res.status(200).json({ message: 'User registered successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password)
      const user = await User.findOne({ username });

      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({userId:user._id , username: user.username }, process.env.SECRET_KEY);
      console.log(token);
      res.status(200).json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
  };

  router.get('/verifyToken', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userInfo = {
        username: user.username,
        userId: user._id,
        bookingData: user.bookings
      };
  
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  

  module.exports = router;