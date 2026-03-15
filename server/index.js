require('dotenv').config()

const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const morgan       = require('morgan')
const cookieParser = require('cookie-parser')
const passport     = require('passport')

const connectDB = require('./config/db')
require('./config/cloudinary') // Initialize Cloudinary
require('./config/passport')   // Initialize Passport strategy

// ── Import all route barrels ──────────────────────────────────
const {
  authRouter,
  projectsRouter,
  galleryRouter,
  experienceRouter,
  skillsRouter,
  teachingRouter,
  testimonialsRouter,
  blogRouter,
  vaultRouter,
  contactRouter,
  analyticsRouter,
  certificationsRouter,
} = require('./routes')

// ── App setup ─────────────────────────────────────────────────
const app  = express()
const PORT = process.env.PORT || 5000

// ── Security middleware ───────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow Cloudinary images
  contentSecurityPolicy: false, // Disable CSP for API — frontend handles this
}))

// ── CORS — allow only your frontend URL ──────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  credentials: true, // Required for httpOnly cookies
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── Request parsing ───────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// ── Logging (dev only) ────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// ── Passport init ─────────────────────────────────────────────
app.use(passport.initialize())

// ── Health check ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Alok Portfolio API is running',
    status:  'healthy',
    version: '1.0.0',
  })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth',            authRouter)
app.use('/api/projects',        projectsRouter)
app.use('/api/gallery',         galleryRouter)
app.use('/api/experience',      experienceRouter)
app.use('/api/skills',          skillsRouter)
app.use('/api/teaching',        teachingRouter)
app.use('/api/testimonials',    testimonialsRouter)
app.use('/api/blog',            blogRouter)
app.use('/api/vault',           vaultRouter)
app.use('/api/contact',         contactRouter)
app.use('/api/analytics',       analyticsRouter)
app.use('/api/certifications',  certificationsRouter)

// ── 404 handler ───────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message)

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File too large' })
  }

  // CORS error
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({ success: false, message: err.message })
  }

  const statusCode = err.status || err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message,
  })
})

// ── Start server ──────────────────────────────────────────────
const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`)
    console.log(`   Mode:    ${process.env.NODE_ENV || 'development'}`)
    console.log(`   Health:  http://localhost:${PORT}/api/health`)
    console.log(`   Docs:    http://localhost:${PORT}\n`)
  })
}

startServer()

module.exports = app