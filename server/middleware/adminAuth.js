const jwt = require('jsonwebtoken')

/**
 * adminAuth middleware
 * Verifies JWT token from httpOnly cookie named 'admin_token'.
 * Attach decoded payload to req.admin on success.
 *
 * Usage:
 *   router.get('/secret', adminAuth, (req, res) => { ... })
 *   router.post('/projects', adminAuth, uploadImage.single('image'), ...)
 *
 * Returns 401 if token missing or invalid.
 * Returns 403 if token valid but expired.
 */
const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies?.admin_token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded // { email, name, iat, exp }
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        message: 'Session expired. Please log in again.',
      })
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token.',
    })
  }
}

module.exports = adminAuth