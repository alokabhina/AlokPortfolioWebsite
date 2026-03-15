const express  = require('express')
const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Skill } = require('../models')

// GET /api/skills — public, grouped by category
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ category: 1, order: 1 })

    // Group by category for frontend consumption
    const grouped = skills.reduce((acc, skill) => {
      const cat = skill.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(skill)
      return acc
    }, {})

    res.json({ skills, grouped })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/skills — admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json({ success: true, data: skill })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/skills/:id — admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Skill not found' })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/skills/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' })
    res.json({ success: true, message: 'Skill deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router