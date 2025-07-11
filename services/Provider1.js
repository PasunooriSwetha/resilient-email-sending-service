// services/Provider1.js

module.exports = {
  send: async (emailData) => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simulate 70% chance of success
    if (Math.random() < 0.7) {
      return {
        success: true,
        provider: 'Provider1',
        message: `Email sent successfully to ${emailData.to} via Provider1`
      };
    }

    // Simulate failure
    throw new Error('Provider1 failed to send email');
  }
};
