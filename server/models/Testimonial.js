const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Student name is required'],
      trim:     true,
    },
    role: {
      type:  String, // e.g. "MERN Stack Student", "Python Learner"
      trim:  true,
    },
    content: {
      type:     String,
      required: [true, 'Testimonial content is required'],
      trim:     true,
      maxlength: [500, 'Testimonial cannot exceed 500 characters'],
    },
    rating: {
      type:    Number,
      min:     1,
      max:     5,
      default: 5,
    },
    avatarUrl: {
      type:  String,
      trim:  true,
    },
    isVisible: {
      type:    Boolean,
      default: true, // Show on teaching page by default
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

testimonialSchema.index({ isVisible: 1, order: 1 })

module.exports = mongoose.model('Testimonial', testimonialSchema)