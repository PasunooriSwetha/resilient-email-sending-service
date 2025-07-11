// services/StatusTracker.js

class StatusTracker {
  constructor() {
    this.statusMap = new Map(); // Map to store emailId -> status
  }

  /**
   * Record the status for a given email ID.
   * @param {string} id - Unique email ID (e.g., "user@example.com-Subject")
   * @param {string} status - Status like 'success', 'failed'
   */
  record(id, status) {
    this.statusMap.set(id, status);
  }

  /**
   * Retrieve the status for a given email ID.
   * @param {string} id
   * @returns {string} status or 'unknown'
   */
  get(id) {
    return this.statusMap.get(id) || 'unknown';
  }
}

module.exports = StatusTracker;
