// ============================================
// EXPRESS SERVER — Portfolio API
// Handles contact form submissions
// ============================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import rateLimit from 'express-rate-limit'
import escapeHtml from 'escape-html'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'
app.use(cors({ origin: ALLOWED_ORIGIN, methods: ['GET', 'POST'] }))
app.use(express.json())

// Rate limiter for contact form — 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Too many contact form submissions. Please try again later.' },
  standardHeaders: false, // disable `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

app.get('/api/health', function(req, res) {
  res.json({ status: 'ok' })
})

app.post('/api/contact', contactLimiter, function(req, res) {
  var name    = req.body.name
  var email   = req.body.email
  var message = req.body.message

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' })
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' })
  }

  // Escape HTML to prevent injection attacks
  var safeName = escapeHtml(name)
  var safeEmail = escapeHtml(email)
  var safeMessage = escapeHtml(message)

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'Portfolio Contact: ' + safeName,
    html:
      '<div style="font-family: sans-serif; max-width: 500px;">' +
      '<h2 style="color: #ff6b2b;">New Message from Portfolio</h2>' +
      '<p><strong>Name:</strong> ' + safeName + '</p>' +
      '<p><strong>Email:</strong> ' + safeEmail + '</p>' +
      '<p><strong>Message:</strong></p>' +
      '<p style="background:#f5f5f5; padding:12px; border-radius:6px;">' + safeMessage + '</p>' +
      '<hr/>' +
      '<p style="color:#999; font-size:12px;">Sent from your portfolio contact form</p>' +
      '</div>',
    replyTo: email,
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.error('Email error:', err)
      return res.status(500).json({ success: false, error: 'Failed to send email.' })
    }
    console.log('Email sent:', info.response)
    res.status(200).json({ success: true, message: 'Message sent successfully!' })
  })
})

app.listen(PORT, function() {
  console.log('Server running at http://localhost:' + PORT)
})
