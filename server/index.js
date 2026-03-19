// ============================================
// EXPRESS SERVER — Portfolio API
// Handles contact form submissions
// ============================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'] }))
app.use(express.json())

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

app.post('/api/contact', function(req, res) {
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

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'Portfolio Contact: ' + name,
    html:
      '<div style="font-family: sans-serif; max-width: 500px;">' +
      '<h2 style="color: #ff6b2b;">New Message from Portfolio</h2>' +
      '<p><strong>Name:</strong> ' + name + '</p>' +
      '<p><strong>Email:</strong> ' + email + '</p>' +
      '<p><strong>Message:</strong></p>' +
      '<p style="background:#f5f5f5; padding:12px; border-radius:6px;">' + message + '</p>' +
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
