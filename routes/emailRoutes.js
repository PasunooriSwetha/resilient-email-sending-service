// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// POST /api/email/send - Send an email
router.post('/send', emailController.sendEmail);

// GET /api/email/status/:id - Get status of email
router.get('/status/:id', emailController.getStatus);

module.exports = router;
