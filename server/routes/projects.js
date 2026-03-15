const express   = require('express')
const router    = express.Router()
const cloudinary = require('../config/cloudinary')
const adminAuth  = require('../middleware/adminAuth')
const { uploadImage } = require('../middleware/upload')
const { Project } = require('../models')

// GET /api/projects — public, all projects sorted by order
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.featured) filter.featured = req.query.featured === 'true'
    if (req.query.category)  filter.category = req.query.category

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/projects/:id — public, single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/projects — admin, create with optional image
router.post('/', adminAuth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body }

    // Parse arrays sent as JSON strings from FormData
    if (typeof data.techStack  === 'string') data.techStack  = JSON.parse(data.techStack)
    if (typeof data.features   === 'string') data.features   = JSON.parse(data.features)

    if (req.file) {
      data.imageUrl = req.file.path       // Cloudinary URL
      data.publicId = req.file.filename   // Cloudinary public_id
    }

    const project = await Project.create(data)
    res.status(201).json({ success: true, data: project })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/projects/:id — admin, update with optional new image
router.put('/:id', adminAuth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body }
    if (typeof data.techStack === 'string') data.techStack = JSON.parse(data.techStack)
    if (typeof data.features  === 'string') data.features  = JSON.parse(data.features)

    const existing = await Project.findById(req.params.id)
    if (!existing) return res.status(404).json({ success: false, message: 'Project not found' })

    // New image uploaded — delete old one from Cloudinary
    if (req.file) {
      if (existing.publicId) {
        await cloudinary.uploader.destroy(existing.publicId).catch(() => {})
      }
      data.imageUrl = req.file.path
      data.publicId = req.file.filename
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/projects/:id — admin, delete + remove from Cloudinary
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })

    if (project.publicId) {
      await cloudinary.uploader.destroy(project.publicId).catch(() => {})
    }

    await project.deleteOne()
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router