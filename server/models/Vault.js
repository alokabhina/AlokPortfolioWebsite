const mongoose = require('mongoose')

const vaultSchema = new mongoose.Schema(
  {
    fileUrl: {
      type:     String,
      required: [true, 'File URL is required'],
      trim:     true,
    },
    publicId: {
      type:     String, // Cloudinary public_id — needed to delete raw files
      required: [true, 'Cloudinary public_id is required'],
      trim:     true,
    },
    fileName: {
      type:     String,
      required: [true, 'File name is required'],
      trim:     true,
    },
    fileType: {
      type:    String, // 'pdf', 'docx', 'xlsx', etc.
      trim:    true,
    },
    mimeType: {
      type:  String,
      trim:  true,
    },
    folder: {
      type:    String,
      enum:    ['work', 'personal', 'certificates', 'notes'],
      default: 'personal',
    },
    size: {
      type:    Number, // File size in bytes
      default: 0,
    },
    notes: {
      type:  String, // Optional description of the file
      trim:  true,
    },
  },
  { timestamps: true }
)

vaultSchema.index({ folder: 1, createdAt: -1 })

module.exports = mongoose.model('Vault', vaultSchema)