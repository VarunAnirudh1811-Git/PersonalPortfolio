// ============================================
// EXPRESS SERVER — Portfolio API
// Handles contact form submissions
// ============================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio server running' });
});

// --- Contact form ---
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email address.'
    });
  }

  // Log submission (replace with email service later e.g. nodemailer)
  console.log('📬 New contact form submission:');
  console.log(`   Name:    ${name}`);
  console.log(`   Email:   ${email}`);
  console.log(`   Message: ${message}`);

  res.status(200).json({
    success: true,
    message: `Thanks ${name}, your message has been received!`
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});