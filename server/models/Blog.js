const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Blog title is required'],
      trim:     true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type:   String,
      unique: true,
      trim:   true,
      lowercase: true,
    },
    content: {
      type: String, // Markdown content
    },
    excerpt: {
      type:  String, // Short preview shown on blog listing
      trim:  true,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    coverImage: {
      type:  String, // Cloudinary URL
      trim:  true,
    },
    coverImagePublicId: {
      type:  String, // For Cloudinary deletion
      trim:  true,
    },
    tags: {
      type:    [String],
      default: [],
    },
    status: {
      type:    String,
      enum:    ['draft', 'published'],
      default: 'draft',
    },
    readTime: {
      type:  Number, // Minutes — auto-calculated or manual
      default: 5,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  // Auto-set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  // Auto-calculate read time from content (~200 words per minute)
  if (this.isModified('content') && this.content) {
    const wordCount = this.content.split(/\s+/).length
    this.readTime = Math.max(1, Math.ceil(wordCount / 200))
  }
  next()
})

blogSchema.index({ status: 1, publishedAt: -1 })
blogSchema.index({ slug: 1 })

module.exports = mongoose.model('Blog', blogSchema)