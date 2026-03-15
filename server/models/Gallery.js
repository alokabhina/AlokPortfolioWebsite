const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type:     String,
      required: [true, 'Image URL is required'],
      trim:     true,
    },
    publicId: {
      type:     String, // Cloudinary public_id — needed to delete from Cloudinary
      required: [true, 'Cloudinary public_id is required'],
      trim:     true,
    },
    title: {
      type:  String,
      trim:  true,
    },
    category: {
      type:    String,
      enum:    ['teaching', 'projects', 'events', 'personal', 'other'],
      default: 'personal',
    },
    // PUBLIC = visible to all visitors
    // PRIVATE = only visible in admin dashboard — never shown on public gallery
    isPublic: {
      type:    Boolean,
      default: true,
    },
    cloudinaryFolder: {
      type:    String,
      default: 'portfolio-gallery',
    },
  },
  { timestamps: true }
)

// Index for fast public-only queries (main gallery page)
gallerySchema.index({ isPublic: 1, createdAt: -1 })

module.exports = mongoose.model('Gallery', gallerySchema)