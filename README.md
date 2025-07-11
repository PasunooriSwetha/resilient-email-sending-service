# 📧 Resilient Email Sending Service

A resilient email delivery system built using **Node.js** and **Express**, with two mock email providers and core reliability features like retries, fallback, idempotency, and rate limiting.

---

## ✅ Features

- 🔁 Retry with **exponential backoff**
- 🔄 **Fallback** between providers
- ✅ **Idempotency** to avoid duplicate sends
- 🚦 **Rate limiting**
- 📊 **Status tracking**
- 🧠 **Bonus**: Circuit breaker, logging, and basic queue system

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript (ES6)
- In-memory storage (for simplicity)

---

## 📁 Project Structure

resilient-email-service/
├── controllers/
│ └── emailController.js
├── providers/
│ ├── provider1.js
│ └── provider2.js
├── routes/
│ └── emailRoutes.js
├── services/
│ ├── EmailService.js
│ ├── RateLimiter.js
│ ├── CircuitBreaker.js
│ └── StatusTracker.js
├── logs/
│ └── logger.js
├── app.js
├── server.js
├── package.json
└── README.md



---

## 🚀 How to Run Locally

```bash
git clone https://github.com/yourusername/resilient-email-service.git
cd resilient-email-service
npm install
node server.js
The server starts at:
👉 http://localhost:3000

📬 API Endpoints
1. Send Email
POST /api/email/send

Body (JSON):
{
  "to": "test@example.com",
  "subject": "Hello",
  "body": "This is a test message"
}
Success Response:

{
  "success": true,
  "provider": "Provider1",
  "message": "Email sent successfully to test@example.com via Provider1"
}
Duplicate Response:
{
  "message": "Duplicate detected - idempotency enforced"
}
2. Get Email Status
GET /api/email/status/:emailId

Format: {to}-{subject}
Example:
GET /api/email/status/test@example.com-Hello
Encode spaces as %20
Example:
GET /api/email/status/test@example.com-New%20Hello
Response:

json
Copy
Edit
{
  "status": "success"   // or "failed", or "unknown"
}
🌐 Cloud Deployment
This app is deployed using Render
🚀 Example API URL:


https://resilient-email-api.onrender.com/api/email/send
