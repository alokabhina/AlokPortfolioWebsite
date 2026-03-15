const mongoose = require('mongoose')
const crypto   = require('crypto')

const visitorSchema = new mongoose.Schema(
  {
    page: {
      type:    String,
      trim:    true,
      default: '/',
    },
    referrer: {
      type:    String,
      trim:    true,
      default: 'direct',
    },
    userAgent: {
      type:  String,
      trim:  true,
    },
    device: {
      type:    String,
      enum:    ['mobile', 'tablet', 'desktop'],
      default: 'desktop',
    },
    // Store hashed IP — never store raw IPs for privacy
    ipHash: {
      type:  String,
      trim:  true,
    },
    country: {
      type:  String,
      trim:  true,
    },
    sessionId: {
      type:  String,
      trim:  true,
    },
  },
  {
    timestamps: true,
    // Auto-delete visitor records after 90 days to save storage
    expireAfterSeconds: 60 * 60 * 24 * 90,
  }
)

// Static helper — hash IP before storing
visitorSchema.statics.hashIP = (ip) => {
  if (!ip) return null
  return crypto.createHash('sha256').update(ip + process.env.JWT_SECRET).digest('hex').slice(0, 16)
}

visitorSchema.index({ page: 1, createdAt: -1 })
visitorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 })

module.exports = mongoose.model('Visitor', visitorSchema)