const express    = require('express')
const router     = express.Router()
const cloudinary = require('../config/cloudinary')
const adminAuth  = require('../middleware/adminAuth')
const { uploadImage } = require('../middleware/upload')
const { Gallery } = require('../models')

// GET /api/gallery — public, only isPublic:true images
router.get('/', async (req, res) => {
  try {
    const filter = { isPublic: true }
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category
    }

    const images = await Gallery.find(filter).sort({ createdAt: -1 })
    res.json(images)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/gallery/all — admin only, returns ALL images (public + private)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ createdAt: -1 })
    res.json(images)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/gallery — admin, upload image + set public/private at upload time
router.post('/', adminAuth, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No image provided' })

    const image = await Gallery.create({
      imageUrl:         req.file.path,
      publicId:         req.file.filename,
      title:            req.body.title    || '',
      category:         req.body.category || 'personal',
      isPublic:         req.body.isPublic !== 'false', // default true; send "false" to make private
      cloudinaryFolder: req.file.path.split('/').slice(-2, -1)[0] || 'portfolio-gallery',
    })

    res.status(201).json({ success: true, data: image })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/gallery/:id — admin, toggle public/private or update title/category
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const allowed = ['title', 'category', 'isPublic']
    const updates = {}
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k] })

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!updated) return res.status(404).json({ success: false, message: 'Image not found' })

    res.json({ success: true, data: updated })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/gallery/:id — admin, delete from Cloudinary + MongoDB
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id)
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' })

    // Delete from Cloudinary first
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId, { resource_type: 'image' }).catch(() => {})
    }

    await image.deleteOne()
    res.json({ success: true, message: 'Image deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router