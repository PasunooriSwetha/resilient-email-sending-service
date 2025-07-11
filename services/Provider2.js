// services/Provider2.js

module.exports = {
  send: async (emailData) => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simulate 80% chance of success
    if (Math.random() < 0.8) {
      return {
        success: true,
        provider: 'Provider2',
        message: `Email sent successfully to ${emailData.to} via Provider2`
      };
    }

    // Simulate failure
    throw new Error('Provider2 failed to send email');
  }
};
