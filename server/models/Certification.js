const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Certificate title is required'],
      trim:     true,
    },
    issuer: {
      type:     String,
      required: [true, 'Issuing organization is required'],
      trim:     true,
    },
    date: {
      type: Date,
    },
    imageUrl: {
      type:  String,
      trim:  true,
    },
    publicId: {
      type:  String, // Cloudinary public_id
      trim:  true,
    },
    credentialUrl: {
      type:  String, // Link to verify certificate online
      trim:  true,
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Certification', certificationSchema)