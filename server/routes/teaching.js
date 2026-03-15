const express  = require('express')
const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Teaching } = require('../models')

// GET /api/teaching — public
router.get('/', async (req, res) => {
  try {
    const subjects = await Teaching.find({}).sort({ order: 1 })
    res.json(subjects)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/teaching — admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body }
    if (typeof data.topics           === 'string') data.topics           = JSON.parse(data.topics)
    if (typeof data.accordionContent === 'string') data.accordionContent = JSON.parse(data.accordionContent)
    const subject = await Teaching.create(data)
    res.status(201).json({ success: true, data: subject })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/teaching/:id — admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const data = { ...req.body }
    if (typeof data.topics           === 'string') data.topics           = JSON.parse(data.topics)
    if (typeof data.accordionContent === 'string') data.accordionContent = JSON.parse(data.accordionContent)
    const updated = await Teaching.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Subject not found' })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/teaching/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const subject = await Teaching.findByIdAndDelete(req.params.id)
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' })
    res.json({ success: true, message: 'Subject deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router