// services/EmailService.js

const Provider1 = require('./Provider1');
const Provider2 = require('./Provider2');
const RateLimiter = require('./RateLimiter');
const StatusTracker = require('./StatusTracker');
const CircuitBreaker = require('./CircuitBreaker');
const logger = require('../logs/logger');

const sentEmails = new Set(); // For idempotency

class EmailService {
  constructor() {
    this.providers = [Provider1, Provider2];
    this.rateLimiter = new RateLimiter(5, 10000); // 5 emails per 10 seconds
    this.statusTracker = new StatusTracker();
    this.circuitBreakers = this.providers.map(() => new CircuitBreaker());
  }

  /**
   * Sends email with retry, fallback, and safety mechanisms.
   * @param {Object} emailData - { to, subject, body }
   */
  async sendEmail(emailData) {
    const emailId = `${emailData.to}-${emailData.subject}`;

    // Check for duplicate (idempotency)
    if (sentEmails.has(emailId)) {
      logger.log(`Duplicate email prevented: ${emailId}`);
      return { message: 'Duplicate detected - idempotency enforced' };
    }

    // Check rate limit
    if (!this.rateLimiter.allow()) {
      logger.warn(`Rate limit exceeded for email: ${emailId}`);
      return { message: 'Rate limit exceeded. Try again later.' };
    }

    // Attempt sending through available providers
    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      const circuitBreaker = this.circuitBreakers[i];

      if (!circuitBreaker.canRequest()) {
        logger.warn(`Provider ${i + 1} is temporarily blocked (circuit open).`);
        continue;
      }

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const result = await provider.send(emailData);
          sentEmails.add(emailId); // Mark as sent
          circuitBreaker.recordSuccess(); // Reset circuit on success
          this.statusTracker.record(emailId, 'success');
          logger.log(`Email sent successfully by Provider${i + 1} on attempt ${attempt + 1}`);
          return result;
        } catch (err) {
          circuitBreaker.recordFailure();
          logger.error(`Attempt ${attempt + 1} failed with Provider${i + 1}: ${err.message}`);
          await this._exponentialBackoff(attempt);
        }
      }
    }

    // All providers failed
    this.statusTracker.record(emailId, 'failed');
    return { message: 'All providers failed to send the email' };
  }

  /**
   * Returns status of a given email send attempt.
   * @param {string} emailId
   */
  getStatus(emailId) {
    return this.statusTracker.get(emailId);
  }

  /**
   * Exponential backoff delay between retries
   */
  async _exponentialBackoff(attempt) {
    const delay = Math.pow(2, attempt) * 100; // 100ms, 200ms, 400ms
    return new Promise((res) => setTimeout(res, delay));
  }
}

module.exports = EmailService;
