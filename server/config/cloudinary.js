const { v2: cloudinary } = require('cloudinary')

/**
 * Configures Cloudinary with credentials from .env
 * Called at server startup (imported in index.js).
 * Export cloudinary instance for use in upload middleware.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true, // Always use HTTPS
})

module.exports = cloudinary