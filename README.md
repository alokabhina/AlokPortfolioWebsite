# Alok Abhinandan — Portfolio

Personal portfolio website built with MERN Stack.
**Theme:** Midnight Teal | **Mode:** Dark + Light

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Lenis  
**Backend:** Node.js, Express, MongoDB, Cloudinary, Passport (Google OAuth)  
**Deploy:** Vercel (frontend) + Render (backend) + MongoDB Atlas

---

## Local Setup

### 1. Clone & install

```bash
git clone https://github.com/yourusername/alok-portfolio.git
cd alok-portfolio

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Environment variables

```bash
# In root folder — copy example and fill in values
cp .env.example .env

# In client folder — create client env
cd client
echo "VITE_API_URL=http://localhost:5000" > .env
echo "VITE_WHATSAPP_NUMBER=91XXXXXXXXXX" >> .env
```

### 3. Add your assets

```
client/public/images/alok-hero.jpg       ← Your portrait photo (600x700px)
client/public/images/alok-about.jpg      ← About page photo (500x600px)
client/public/images/aspirantarena.jpg   ← Project screenshot (800x450px)
client/public/images/og-image.png        ← Social preview (1200x630px)
client/public/resume/alok-resume.pdf     ← Your resume PDF
client/public/favicon.ico                ← Browser icon (32x32px)
```

### 4. Run development servers

```bash
# Terminal 1 — Frontend (runs on :5173)
cd client
npm run dev

# Terminal 2 — Backend (runs on :5000)
cd server
npm run dev
```

Visit `http://localhost:5173`

---

## Project Structure

```
alok-portfolio/
├── client/          # React + Vite frontend
├── server/          # Node + Express backend
├── .env.example     # Environment variable template
└── .gitignore
```

---

## Deployment

- **Frontend** → [Vercel](https://vercel.com) — connect GitHub, root: `client/`
- **Backend**  → [Render](https://render.com) — connect GitHub, root: `server/`
- **Database** → [MongoDB Atlas](https://cloud.mongodb.com) — free M0 cluster
- **Images**   → [Cloudinary](https://cloudinary.com) — free tier

---

Built by **Alok Abhinandan** — Full-Stack Developer & Educator