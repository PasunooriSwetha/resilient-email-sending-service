// server.js

const app = require('./app');

// Use environment port or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
