const express    = require('express')
const router     = express.Router()
const cloudinary = require('../config/cloudinary')
const adminAuth  = require('../middleware/adminAuth')
const { uploadImage } = require('../middleware/upload')
const { Certification } = require('../models')

// GET /api/certifications — public
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find({}).sort({ order: 1, date: -1 })
    res.json(certs)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/certifications — admin + optional image
router.post('/', adminAuth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body }
    if (req.file) {
      data.imageUrl = req.file.path
      data.publicId = req.file.filename
    }
    const cert = await Certification.create(data)
    res.status(201).json({ success: true, data: cert })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/certifications/:id — admin
router.put('/:id', adminAuth, uploadImage.single('image'), async (req, res) => {
  try {
    const existing = await Certification.findById(req.params.id)
    if (!existing) return res.status(404).json({ success: false, message: 'Certificate not found' })
    const data = { ...req.body }
    if (req.file) {
      if (existing.publicId) await cloudinary.uploader.destroy(existing.publicId).catch(()=>{})
      data.imageUrl = req.file.path
      data.publicId = req.file.filename
    }
    const updated = await Certification.findByIdAndUpdate(req.params.id, data, { new: true })
    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/certifications/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id)
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' })
    if (cert.publicId) await cloudinary.uploader.destroy(cert.publicId).catch(()=>{})
    await cert.deleteOne()
    res.json({ success: true, message: 'Certificate deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router