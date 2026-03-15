const mongoose = require('mongoose')

// Sub-schema for accordion sections inside each subject
const accordionItemSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  items: { type: [String], default: [] },
}, { _id: false })

const teachingSchema = new mongoose.Schema(
  {
    subject: {
      type:     String,
      required: [true, 'Subject name is required'],
      trim:     true,
    },
    icon: {
      type:    String,
      default: '📚',
    },
    description: {
      type:  String,
      trim:  true,
    },
    topics: {
      type:    [String],
      default: [],
    },
    accordionContent: {
      type:    [accordionItemSchema],
      default: [],
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

teachingSchema.index({ order: 1 })

module.exports = mongoose.model('Teaching', teachingSchema)