# Alok Abhinandan — Personal Portfolio

A full-stack personal portfolio website built with the **MERN Stack**, featuring a dark/light theme, admin dashboard, dynamic content management, and visitor analytics.

**Live:** [alok-portfolio.vercel.app](https://alok-portfolio.vercel.app)  
**Theme:** Midnight Teal — Dark + Light mode  
**Stack:** React · Node.js · Express · MongoDB · Cloudinary

---

## Features

### Public Pages
| Page | Description |
|------|-------------|
| **Home** | Hero section with typing animation, stats counter, featured project card |
| **About** | Bio, fun facts with icons, journey timeline |
| **Services** | Freelance services with WhatsApp + contact form CTAs |
| **Skills** | 6 skill categories — Programming, Web Dev, Tools, AI, Productivity, Soft Skills |
| **Projects** | Featured project + filterable project grid |
| **Teaching** | Subjects taught, curriculum accordion, testimonials horizontal marquee |
| **Experience** | Work/teaching timeline + certifications |
| **Gallery** | Masonry photo grid with category filter + lightbox |
| **Contact** | Email form (Nodemailer) + WhatsApp button + social links |
| **Blog** | Coming soon with email notify form |

### Technical Highlights
- **Animated dark grid** — teal lines travel horizontally + vertically in dark mode
- **Lead popup** — collects visitor name/phone/email after 10s, saved to database
- **SEO** — react-helmet-async with OG tags on every page
- **Lazy loading** — route-level code splitting + lazy images
- **Rate limiting** — contact form limited to 5/hour per IP
- **Analytics** — page visit tracking with hashed IPs (privacy-safe)
- **Responsive** — mobile-first, works on all screen sizes

---

## Tech Stack

### Frontend
```
React 18              — UI framework
Vite                  — Build tool + dev server
Tailwind CSS v3       — Utility-first styling
Framer Motion         — Animations
react-helmet-async    — SEO meta tags
react-hook-form       — Contact form validation
react-hot-toast       — Toast notifications
yet-another-react-lightbox — Gallery lightbox
react-masonry-css     — Masonry grid layout
react-simple-typewriter    — Typing animation
react-countup         — Stats counter
axios                 — HTTP client
lucide-react          — Icons
```

### Backend
```
Node.js + Express     — Server framework
MongoDB + Mongoose    — Database + ODM
Cloudinary            — Image/file storage (CDN)
Nodemailer            — Contact form emails (Gmail SMTP)
express-rate-limit    — API rate limiting
helmet                — Security headers
morgan                — Request logging
cors                  — Cross-origin requests
dotenv                — Environment variables
```

---

## Project Structure

```
alok-portfolio/
├── client/                     # React frontend (Vite)
│   ├── public/
│   │   ├── images/             # Static images (hero, projects, OG)
│   │   ├── resume/             # Resume PDF
│   │   └── favicon.ico
│   └── src/
│       ├── components/         # Shared UI components
│       ├── pages/              # Route-level pages (lazy loaded)
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Services.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Teaching.jsx
│       │   ├── Experience.jsx
│       │   ├── Gallery.jsx
│       │   ├── Contact.jsx
│       │   └── Blog.jsx
│       ├── hooks/              # Custom React hooks
│       │   ├── useTheme.js
│       │   ├── useScrollSpy.js
│       │   ├── useFetch.js     # API call with static fallback
│       │   └── useAnalytics.js
│       ├── lib/
│       │   ├── axios.js        # Axios instance with interceptors
│       │   └── utils.js        # cn, formatDate, buildWhatsAppLink
│       ├── data/
│       │   └── content.js      # All static fallback data
│       ├── context/
│       │   └── ThemeContext.jsx
│       └── styles/
│           ├── globals.css     # CSS variables, animations, grid
│           └── animations.css  # @keyframes
│
└── server/                     # Node.js + Express backend
    ├── config/
    │   ├── db.js               # MongoDB connection
    │   └── cloudinary.js       # Cloudinary SDK config
    ├── middleware/
    │   └── upload.js           # Multer + Cloudinary storage
    ├── models/
    │   ├── Project.js
    │   ├── Gallery.js
    │   ├── Experience.js
    │   ├── Certification.js
    │   ├── Skill.js
    │   ├── Teaching.js
    │   ├── Testimonial.js
    │   ├── Blog.js
    │   ├── Vault.js
    │   ├── Contact.js
    │   └── Visitor.js
    ├── routes/
    │   ├── projects.js
    │   ├── gallery.js
    │   ├── experience.js
    │   ├── skills.js
    │   ├── teaching.js
    │   ├── testimonials.js
    │   ├── blog.js
    │   ├── contact.js
    │   ├── analytics.js
    │   └── certifications.js
    ├── seedTestimonials.js      # One-time seed script
    └── index.js                # Express app entry
```

---

## Local Development Setup

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/alokabhina/alok-portfolio.git
cd alok-portfolio
```

### 2. Frontend setup

```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=916200748856
```

### 3. Backend setup

```bash
cd ../server
npm install
```

Create `server/.env` — fill in your values:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=generate_a_long_random_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_gmail_app_password
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate. Use this 16-character password, NOT your real Gmail password.

> **JWT Secret:** Generate with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### 4. Run both servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# ✅ MongoDB connected
# 🚀 Server running on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# App opens at http://localhost:5173
```

### 5. Seed testimonials (optional, run once)

```bash
cd server
node seedTestimonials.js
# ✅ Seeded 14 testimonials!
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Where to get it |
|----------|----------------|
| `MONGODB_URI` | MongoDB Atlas → Connect → Connection String |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard |
| `JWT_SECRET` | Generate locally (see above) |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Gmail App Password (16 chars) |
| `PORT` | `5000` |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend URL |

### Client (`client/.env`)

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Backend URL (`http://localhost:5000` for dev) |
| `VITE_WHATSAPP_NUMBER` | Phone number with country code, no `+` sign |

---

## API Reference

All public endpoints return JSON. No authentication required for public routes.

### Projects
```
GET  /api/projects              # All projects
GET  /api/projects/:id          # Single project
```

### Gallery
```
GET  /api/gallery               # Public images only
GET  /api/gallery?category=teaching  # Filter by category
```

### Experience & Certifications
```
GET  /api/experience            # All experience entries
GET  /api/certifications        # All certifications
```

### Skills
```
GET  /api/skills                # All skills, grouped by category
```

### Teaching
```
GET  /api/teaching              # All teaching subjects
```

### Testimonials
```
GET  /api/testimonials          # Approved testimonials only
```

### Contact
```
POST /api/contact               # Send a message (rate limited: 5/hr/IP)
```

### Analytics
```
POST /api/analytics/track       # Track a page visit (silent fail)
```

### Blog
```
GET  /api/blog                  # Published posts only
GET  /api/blog/:slug            # Single post by slug
```

### Health Check
```
GET  /api/health                # {"status":"healthy","timestamp":"..."}
```

---

## Deployment

### Frontend → Vercel

1. Push code to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_WHATSAPP_NUMBER` = your number
5. Deploy → copy your `.vercel.app` URL

### Backend → Render

1. [render.com](https://render.com) → New Web Service → Connect repo
2. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
3. Add all server environment variables
4. Set `CLIENT_URL` = your Vercel URL
5. Deploy → test health check:
   ```bash
   curl https://your-backend.onrender.com/api/health
   ```

---

## Required Image Assets

Place these in `client/public/` before deploying:

| File | Size | Used In |
|------|------|---------|
| `images/alok-hero.jpg` | 600×700px | Home page — hero photo |
| `images/alok-about.jpg` | 500×600px | About page — bio photo |
| `images/aspirantarena.jpg` | 800×450px | Featured project screenshot |
| `images/saarthilearn.jpg` | 800×450px | SaarthiLearn project screenshot |
| `images/spendyfy.jpg` | 800×450px | Spendyfy screenshot |
| `images/og-image.png` | 1200×630px | Social media preview (WhatsApp, LinkedIn) |
| `resume/alok-resume.pdf` | Max 2MB | Resume download button |
| `favicon.ico` | 32×32px | Browser tab icon |

**Quick tools:**
- Favicon: [favicon.io](https://favicon.io) → Text "AA", color `#00D4AA`
- OG Image: [canva.com](https://canva.com) → LinkedIn Post → teal bg → name + title

---

## Color System (Midnight Teal)

```css
/* Dark mode (default) */
--bg-primary:     #060A10    /* Page background */
--bg-secondary:   #0C1320    /* Section alt background */
--bg-card:        #111C2E    /* Cards */
--border:         #1A2D42    /* All borders */
--accent:         #00D4AA    /* Teal — primary brand color */
--text-primary:   #C8DFF0    /* Body text */
--text-secondary: #5A7A9A    /* Muted / label text */
--text-heading:   #EAF4FF    /* Headings */

/* Light mode (html.light class) */
--bg-primary:     #F0F8FF
--bg-secondary:   #E0EAF5
--bg-card:        #FFFFFF
--border:         #CBD5E0
--accent:         #0F6E56
--text-primary:   #1A3040
```

**Fonts (Google Fonts):**
- `Syne` 700/800 — Display headings
- `DM Sans` 400/500 — Body text
- `DM Mono` 400/500 — Labels, code, mono

---

## Updating Content

All static content lives in **`client/src/data/content.js`**. Edit once, everything updates.

Key fields to personalize:

```js
export const PERSONAL = {
  name:      'Your Name',
  email:     'your@gmail.com',
  github:    'https://github.com/yourusername',
  linkedin:  'https://linkedin.com/in/yourusername',
  instagram: 'https://instagram.com/yourusername',
  whatsapp:  '91XXXXXXXXXX',
}
```

After editing, commit → push → auto-redeploy on Vercel.

---

## Scripts

```bash
# Frontend (cd client/)
npm run dev        # Dev server → localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally

# Backend (cd server/)
npm run dev        # Dev server with auto-restart (nodemon)
npm start          # Production server

node seedTestimonials.js   # Seed 14 default testimonials (run once)
```

---

## Known Limitations

- Blog page is a placeholder — writing/publishing not yet implemented
- Gallery images must be uploaded via the management dashboard
- Testimonials require approval before appearing on the teaching page
- Visitor analytics records auto-delete after 90 days

---

## License

Personal portfolio — feel free to use as reference or inspiration.  
Do not deploy as-is with the original owner's personal information.

---

## Contact

**Alok Abhinandan** — Full-Stack Developer & Educator  
📧 alokabhinandan123@gmail.com  
🐙 [github.com/alokabhina](https://github.com/alokabhina)  
💼 [linkedin.com/in/alok-abhinandan-866619241](https://www.linkedin.com/in/alok-abhinandan-866619241/)
