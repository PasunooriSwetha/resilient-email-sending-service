// app.js

const express = require('express');
const app = express();
const emailRoutes = require('./routes/emailRoutes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Register the email routes
app.use('/api/email', emailRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Resilient Email Service is running!');
});

module.exports = app;
