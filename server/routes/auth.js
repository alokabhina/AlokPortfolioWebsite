const express  = require('express')
const router   = express.Router()
const passport = require('passport')
const jwt      = require('jsonwebtoken')
const adminAuth = require('../middleware/adminAuth')

const COOKIE_OPTIONS = {
  httpOnly: true,          // JS cannot access — XSS protection
  secure:   process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in ms
}

// GET /api/auth/google — initiate Google OAuth flow
router.get('/google',
  passport.authenticate('google', {
    scope:   ['profile', 'email'],
    session: false,
  })
)

// GET /api/auth/google/callback — OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/admin-login?error=unauthorized' }),
  (req, res) => {
    // Passport verified email === ADMIN_EMAIL
    // req.user = { email, name, avatar }
    const token = jwt.sign(
      { email: req.user.email, name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set JWT in httpOnly cookie — safest storage method
    res.cookie('admin_token', token, COOKIE_OPTIONS)

    // Redirect to admin dashboard on frontend
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173'
    res.redirect(`${clientURL}/admin-dashboard`)
  }
)

// GET /api/auth/me — verify current session (used by ProtectedRoute on frontend)
router.get('/me', adminAuth, (req, res) => {
  res.json({
    success: true,
    admin: {
      email: req.admin.email,
      name:  req.admin.name,
    },
  })
})

// POST /api/auth/logout — clear the JWT cookie
router.post('/logout', adminAuth, (req, res) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  })
  res.json({ success: true, message: 'Logged out successfully' })
})

module.exports = router