const express      = require('express')
const router       = express.Router()
const nodemailer   = require('nodemailer')
const rateLimit    = require('express-rate-limit')
const adminAuth    = require('../middleware/adminAuth')
const { Contact }  = require('../models')

// Rate limit — 5 contact submissions per hour per IP
const contactLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max:      5,
  message:  { success: false, message: 'Too many messages. Please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders:   false,
})

// Nodemailer transporter — Gmail SMTP
const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
})

// POST /api/contact — public, rate limited
router.post('/', contactLimit, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' })
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, subject, message })

    // Send email notification to admin
    try {
      const transporter = createTransporter()
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to:      process.env.EMAIL_USER,
        replyTo: email,
        subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#00D4AA">New Portfolio Message</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold;width:80px">From:</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold">Subject:</td><td style="padding:8px">${subject || '—'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px">
              <p style="white-space:pre-wrap;margin:0">${message}</p>
            </div>
            <p style="margin-top:20px;font-size:12px;color:#999">
              Sent via your portfolio contact form at ${new Date().toLocaleString('en-IN')}
            </p>
          </div>
        `,
      })
    } catch (emailErr) {
      // Email send failed — still return success since message was saved to DB
      console.error('Email send failed:', emailErr.message)
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/contact — admin, all messages newest first
router.get('/', adminAuth, async (req, res) => {
  try {
    const filter = {}
    if (req.query.unread === 'true') filter.isRead = false

    const messages = await Contact.find(filter).sort({ createdAt: -1 })
    const unreadCount = await Contact.countDocuments({ isRead: false })

    res.json({ success: true, data: messages, unreadCount })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/contact/:id/read — admin, mark as read
router.put('/:id/read', adminAuth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, repliedAt: req.body.replied ? new Date() : undefined },
      { new: true }
    )
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' })
    res.json({ success: true, data: msg })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/contact/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router