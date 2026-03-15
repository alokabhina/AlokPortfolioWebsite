const express  = require('express')
const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Experience } = require('../models')

// GET /api/experience — public
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find({}).sort({ order: 1, startDate: -1 })
    res.json(experience)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/experience — admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body }
    if (typeof data.techUsed === 'string') data.techUsed = JSON.parse(data.techUsed)
    const entry = await Experience.create(data)
    res.status(201).json({ success: true, data: entry })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/experience/:id — admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body }
    if (typeof data.techUsed === 'string') data.techUsed = JSON.parse(data.techUsed)
    const updated = await Experience.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Entry not found' })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/experience/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const entry = await Experience.findByIdAndDelete(req.params.id)
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' })
    res.json({ success: true, message: 'Experience deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router