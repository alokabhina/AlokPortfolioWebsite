import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://alokabhinandan.dev' // Update with real domain
const DEFAULT_IMG = `${BASE_URL}/og-image.png`  // Add a 1200x630 og image in /public

/**
 * SEO Component
 * Use on every page for meta tags, OG tags, and page title.
 *
 * @example
 * <SEO
 *   title="About"
 *   description="Learn about Alok Abhinandan — MERN stack developer and educator."
 *   path="/about"
 * />
 */
export default function SEO({
  title,
  description = 'Alok Abhinandan is a Full-Stack Developer and Educator specializing in MERN Stack, Python, and building education-focused web applications.',
  path = '',
  image = DEFAULT_IMG,
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | Alok Abhinandan`
    : 'Alok Abhinandan | Full-Stack Developer & Educator'

  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description"       content={description} />
      <meta name="author"            content="Alok Abhinandan" />
      <meta name="robots"            content="index, follow" />
      <link rel="canonical"          href={url} />

      {/* Keywords */}
      <meta
        name="keywords"
        content="Alok Abhinandan, Full Stack Developer, MERN Stack, React Developer, Node.js, Python, Educator, Portfolio, AspirantArena"
      />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content="Alok Abhinandan Portfolio" />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Theme color */}
      <meta name="theme-color" content="#00D4AA" />
    </Helmet>
  )
}