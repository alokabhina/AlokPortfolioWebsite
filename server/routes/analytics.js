const express  = require('express')

const mongoose = require('mongoose')
const LeadSchema = new mongoose.Schema({
  name:      { type: String, trim: true },
  phone:     { type: String, trim: true },
  email:     { type: String, trim: true, lowercase: true },
  page:      { type: String, default: '/' },
  createdAt: { type: Date, default: Date.now },
})
const Lead = mongoose.model('Lead', LeadSchema)


const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Visitor } = require('../models')

// POST /api/analytics/track — public, log a page visit
router.post('/track', async (req, res) => {
  try {
    const { page, referrer, userAgent, device } = req.body

    // Hash the IP for privacy — never store raw IPs
    const rawIP  = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || ''
    const ipHash = Visitor.hashIP(rawIP)

    await Visitor.create({ page, referrer, userAgent, device, ipHash })
    res.status(201).json({ success: true })
  } catch (err) {
    // Analytics failure should never crash — silent fail
    res.status(200).json({ success: false })
  }
})

// GET /api/analytics — admin only, aggregate stats
router.get('/', adminAuth, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const [
      totalVisits,
      recentVisits,
      topPages,
      deviceBreakdown,
    ] = await Promise.all([
      // All time total
      Visitor.countDocuments(),

      // Last N days
      Visitor.countDocuments({ createdAt: { $gte: since } }),

      // Top 5 pages by visits
      Visitor.aggregate([
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort:  { count: -1 } },
        { $limit: 5 },
        { $project: { page: '$_id', count: 1, _id: 0 } },
      ]),

      // Device breakdown
      Visitor.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $project: { device: '$_id', count: 1, _id: 0 } },
      ]),
    ])

    res.json({
      success: true,
      data: {
        totalVisits,
        recentVisits,
        topPages,
        deviceBreakdown,
        period: `Last ${days} days`,
      },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})


// POST /api/analytics/lead — save visitor contact info
router.post('/lead', async (req, res) => {
  try {
    const { name, phone, email, page } = req.body
    if (!name) return res.status(400).json({ success: false, message: 'Name required' })
    await Lead.create({ name, phone, email, page })
    res.status(201).json({ success: true })
  } catch {
    res.status(200).json({ success: false })
  }
})

// GET /api/analytics/leads — admin only
router.get('/leads', adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 })
    res.json({ success: true, data: leads })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router