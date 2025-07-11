// controllers/emailController.js

const EmailService = require('../services/EmailService');
const emailService = new EmailService();

/**
 * Handles sending email requests.
 */
exports.sendEmail = async (req, res) => {
  try {
    const result = await emailService.sendEmail(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Retrieves the status of an email sending attempt.
 */
exports.getStatus = (req, res) => {
  try {
    const decodedId = decodeURIComponent(req.params.id); // ✅ decode URL-safe ID
    const status = emailService.getStatus(decodedId);
    res.status(200).json({ status });
  } catch (error) {
    console.error("Error getting status:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
