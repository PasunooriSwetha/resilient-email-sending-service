// services/CircuitBreaker.js

class CircuitBreaker {
  constructor(failureThreshold = 3, cooldownTime = 10000) {
    this.failureThreshold = failureThreshold; // Max consecutive failures
    this.cooldownTime = cooldownTime;         // Cooldown in ms after tripping
    this.failures = 0;
    this.lastFailureTime = null;
  }

  /**
   * Check if a request can proceed through this circuit.
   */
  canRequest() {
    if (this.failures < this.failureThreshold) {
      return true;
    }

    const now = Date.now();

    // If enough time has passed, allow retry
    if (now - this.lastFailureTime > this.cooldownTime) {
      this.reset();
      return true;
    }

    // Circuit remains open
    return false;
  }

  /**
   * Called when a request succeeds.
   */
  recordSuccess() {
    this.reset();
  }

  /**
   * Called when a request fails.
   */
  recordFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
  }

  /**
   * Resets the circuit breaker state.
   */
  reset() {
    this.failures = 0;
    this.lastFailureTime = null;
  }
}

module.exports = CircuitBreaker;
