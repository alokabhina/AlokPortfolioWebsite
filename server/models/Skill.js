const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Skill name is required'],
      trim:     true,
    },
    category: {
      type: String,
      enum: ['programming', 'webdev', 'tools', 'other'],
      default: 'webdev',
    },
    iconUrl: {
      type:  String, // Devicon CDN URL or custom icon
      trim:  true,
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

skillSchema.index({ category: 1, order: 1 })

module.exports = mongoose.model('Skill', skillSchema)