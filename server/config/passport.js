const passport      = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

/**
 * Google OAuth Strategy
 * Only allows login if the authenticated Google email
 * matches ADMIN_EMAIL in .env.
 *
 * On success: passport calls done(null, user)
 * On unauthorized: passport calls done(null, false)
 */
passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value

        // Strict email check — only your Gmail can log in
        if (email !== process.env.ADMIN_EMAIL) {
          console.warn(`⚠️  Unauthorized login attempt: ${email}`)
          return done(null, false, { message: 'Unauthorized email' })
        }

        // Pass minimal user object — we only need email + name
        const user = {
          email,
          name:   profile.displayName,
          avatar: profile.photos?.[0]?.value || null,
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

// Serialize/deserialize — required by passport even if not using sessions
// We use JWT cookies so sessions are not needed, but passport requires these
passport.serializeUser((user, done)   => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport