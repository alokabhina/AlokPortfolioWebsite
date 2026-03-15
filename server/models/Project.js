const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Project title is required'],
      trim:     true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type:     String,
      required: [true, 'Short description is required'],
      trim:     true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    longDesc: {
      type:  String,
      trim:  true,
    },
    techStack: {
      type:    [String],
      default: [],
    },
    features: {
      type:    [String],
      default: [],
    },
    githubUrl: {
      type:  String,
      trim:  true,
    },
    liveUrl: {
      type:  String,
      trim:  true,
    },
    imageUrl: {
      type:  String,
      trim:  true,
    },
    publicId: {
      type:  String, // Cloudinary public_id for deletion
      trim:  true,
    },
    featured: {
      type:    Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['mern', 'python', 'frontend', 'other'],
      default: 'mern',
    },
    order: {
      type:    Number,
      default: 0, // Lower = shown first
    },
  },
  { timestamps: true }
)

// Index for faster featured queries
projectSchema.index({ featured: 1, order: 1 })

module.exports = mongoose.model('Project', projectSchema)