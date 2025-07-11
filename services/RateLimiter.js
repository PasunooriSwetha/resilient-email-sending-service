// services/RateLimiter.js

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;         // Max number of requests
    this.windowMs = windowMs;   // Time window in milliseconds
    this.timestamps = [];       // Store timestamps of requests
  }

  allow() {
    const now = Date.now();

    // Remove timestamps older than window
    this.timestamps = this.timestamps.filter(ts => now - ts < this.windowMs);

    if (this.timestamps.length >= this.limit) {
      return false; // Rate limit exceeded
    }

    // Allow and record this request
    this.timestamps.push(now);
    return true;
  }
}

module.exports = RateLimiter;
