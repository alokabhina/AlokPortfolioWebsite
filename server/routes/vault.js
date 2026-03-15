const express    = require('express')
const router     = express.Router()
const cloudinary = require('../config/cloudinary')
const adminAuth  = require('../middleware/adminAuth')
const { uploadRaw } = require('../middleware/upload')
const { Vault } = require('../models')

// GET /api/vault — admin, list all vault files optionally filtered by folder
router.get('/', adminAuth, async (req, res) => {
  try {
    const filter = {}
    if (req.query.folder) filter.folder = req.query.folder

    const files = await Vault.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: files })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/vault — admin, upload file to Cloudinary (raw resource_type)
router.post('/', adminAuth, uploadRaw.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })

    const vaultFile = await Vault.create({
      fileUrl:   req.file.path,      // Cloudinary URL
      publicId:  req.file.filename,  // Cloudinary public_id
      fileName:  req.file.originalname,
      fileType:  req.file.originalname.split('.').pop().toLowerCase(),
      mimeType:  req.file.mimetype,
      folder:    req.body.folder || 'personal',
      size:      req.file.size || 0,
      notes:     req.body.notes || '',
    })

    res.status(201).json({ success: true, data: vaultFile })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/vault/:id — admin, delete from Cloudinary + MongoDB
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const file = await Vault.findById(req.params.id)
    if (!file) return res.status(404).json({ success: false, message: 'File not found' })

    // Destroy from Cloudinary — raw resource_type required for non-images
    if (file.publicId) {
      await cloudinary.uploader.destroy(file.publicId, { resource_type: 'raw' }).catch(() => {})
    }

    await file.deleteOne()
    res.json({ success: true, message: 'File deleted from vault' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router