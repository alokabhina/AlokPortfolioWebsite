const mongoose = require('mongoose')

/**
 * connectDB
 * Connects to MongoDB Atlas using MONGODB_URI from .env
 * Called once in index.js on server startup.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options suppress deprecation warnings
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`)
    process.exit(1) // Exit process — server cannot run without DB
  }
}

// Log if connection drops after initial connect
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message)
})

module.exports = connectDB