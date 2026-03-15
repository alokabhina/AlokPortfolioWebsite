const multer              = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary            = require('../config/cloudinary')

// ── Image upload (JPG, PNG, WebP) ────────────────────────────
// Used for: gallery, projects screenshots, certifications
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Determine folder from route or query
    const folder = req.body.folder || req.query.folder || 'portfolio-gallery'
    return {
      folder,
      resource_type:  'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }, // Auto-optimize
      ],
    }
  },
})

// ── Raw file upload (PDF, DOCX, etc.) ────────────────────────
// Used for: personal vault, resume
const rawStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.body.folder
      ? `portfolio-vault/${req.body.folder}`
      : 'portfolio-vault'
    return {
      folder,
      resource_type:   'raw', // Required for non-image files
      allowed_formats: ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'],
      use_filename:    true,
      unique_filename: true,
    }
  },
})

// ── File filter helpers ───────────────────────────────────────
const imageFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed (JPG, PNG, WebP, GIF)'), false)
  }
}

const rawFilter = (req, file, cb) => {
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
  ]
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File type not allowed'), false)
  }
}

// ── Exported multer instances ─────────────────────────────────

/**
 * uploadImage
 * Use: uploadImage.single('image') or uploadImage.array('images', 5)
 * Uploads to Cloudinary as image resource_type
 * Max size: 10MB
 */
const uploadImage = multer({
  storage:  imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
})

/**
 * uploadRaw
 * Use: uploadRaw.single('file')
 * Uploads to Cloudinary as raw resource_type (PDFs, docs)
 * Max size: 25MB
 */
const uploadRaw = multer({
  storage:  rawStorage,
  fileFilter: rawFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
})

module.exports = { uploadImage, uploadRaw }