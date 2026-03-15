const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Job title is required'],
      trim:     true,
    },
    organization: {
      type:     String,
      required: [true, 'Organization name is required'],
      trim:     true,
    },
    type: {
      type: String,
      enum: ['work', 'teaching', 'freelance'],
      default: 'work',
    },
    startDate: {
      type:     Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type:    Date,
      default: null, // null = current position
    },
    current: {
      type:    Boolean,
      default: false,
    },
    description: {
      type:  String,
      trim:  true,
    },
    techUsed: {
      type:    [String],
      default: [],
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

experienceSchema.index({ order: 1, startDate: -1 })

module.exports = mongoose.model('Experience', experienceSchema)