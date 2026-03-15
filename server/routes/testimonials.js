const express  = require('express')
const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Testimonial } = require('../models')


// POST /api/testimonials/submit — public, student submits feedback (needs admin approval)
router.post('/submit', async (req, res) => {
  try {
    const { name, role, content, rating } = req.body
    if (!name || !content) return res.status(400).json({ success: false, message: 'Name and content required' })
    // isVisible: false — admin must approve from dashboard
    const t = await Testimonial.create({ name, role, content, rating: rating || 5, isVisible: false })
    res.status(201).json({ success: true, data: t })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/testimonials/public/:id — student can delete their own (no auth needed)
// In production you'd add a token, for now just allow by ID
router.delete('/public/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Testimonial deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/testimonials — public, only visible ones
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isVisible: true }).sort({ order: 1 })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/testimonials/all — admin, all testimonials
router.get('/all', adminAuth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ order: 1 })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/testimonials — admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    res.status(201).json({ success: true, data: testimonial })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/testimonials/:id — admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Testimonial not found' })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/testimonials/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Testimonial deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router