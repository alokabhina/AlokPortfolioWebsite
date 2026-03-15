/**
 * content.js — Complete static data for Alok Abhinandan Portfolio
 */

export const PERSONAL = {
  name: 'Alok Abhinandan',
  title: 'Full-Stack Developer & Educator',
  email: 'alokabhinandan123@gmail.com',
  github: 'https://github.com/alokabhina',
  linkedin: 'https://www.linkedin.com/in/alok-abhinandan-866619241/',
  instagram: 'https://www.instagram.com/alok_abhinandan4?igsh=Zm85eTFkZjdwNG5l',
  whatsapp: '916200748856',
  location: 'Gorakhpur, India',
  available: true,
  resumeUrl: '/resume/alok-resume.pdf',

  typingTitles: [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'Python Programmer',
    'Educator & Mentor',
  ],

  heroBio: 'I build practical web applications using the MERN stack and Python, and create technology that helps students learn more effectively.',

  aboutBio: [
    'I am a Computer Science graduate from Deen Dayal Upadhyaya University, Gorakhpur and a full-stack developer who loves combining technology with education. I teach MERN Stack development, Python programming, and AI tools at Acme Institute, Shahi Market, Gorakhpur.',
    'I completed my MERN Stack internship from NIELIT Gorakhpur with an S Grade (highest). Along with teaching, I actively build projects that solve real problems for students and learners.',
    'My key projects include AspirantArena (exam prep platform), SaarthiLearn (LMS — my graduation project), and Spendyfy (expense tracker). I enjoy building tools that create real value.',
  ],
 funFacts: [
{
  emoji: "◆",
  text: "Built real-world platforms like AspirantArena, SaarthiLearn, and Spendyfy. These projects focus on solving practical problems in education and productivity using modern web technologies."
},
{
  emoji: "▪",
  text: "Currently teaching Full Stack Web Development and Python at Acme Institute, Gorakhpur. I focus on explaining concepts through practical coding and real-world project building."
},
{
  emoji: "◦",
  text: "Completed MERN Stack Internship at NIELIT with an S Grade. The program included hands-on development work and exposure to modern JavaScript frameworks and backend systems."
},
{
  emoji: "•",
  text: "I believe education and technology together can create real impact. My goal is to build tools and learning platforms that help students grow and improve their technical skills."
}
],
  chips: ['CS Graduate', 'Full-Stack Dev', 'Educator', 'MERN Stack', 'Python', 'AI Tools', 'EdTech Builder'],
}

export const STATS = [
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: 100, suffix: '+', label: 'Students Taught' },
  { value: 15, suffix: '+', label: 'Technologies Used' },
  { value: 3, suffix: '+', label: 'Years Coding' },
]

export const SKILLS = [
  {
    category: 'Programming',
    icon: '{}',
    items: [
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'C', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    ],
  },
  {
    category: 'Web Development',
    icon: '</>',
    items: [
      { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'React.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Bootstrap', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
  },
  {
    category: 'Tools & Technologies',
    icon: '⚙',
    items: [
      { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Tailwind CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'VS Code', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Vite', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
      { name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Cloudinary', iconUrl: null },
      { name: 'REST APIs', iconUrl: null },
    ],
  },
  {
    category: 'AI Tools',
    icon: '🤖',
    items: [
      { name: 'ChatGPT', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg' },
      { name: 'GitHub Copilot', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Gemini', iconUrl: null },
      { name: 'Midjourney', iconUrl: null },
      { name: 'Cursor AI', iconUrl: null },
      { name: 'Prompt Engineering', iconUrl: null },
    ],
  },
  {
    category: 'Productivity',
    icon: '📊',
    items: [
      { name: 'MS Word', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/word/word-original.svg' },
      { name: 'MS Excel', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/excel/excel-original.svg' },
      { name: 'PowerPoint', iconUrl: null },
      { name: 'Canva', iconUrl: null },
      { name: 'Figma Basics', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },

  {
    category: 'Soft Skills',
    icon: '✦',
    items: [
      { name: 'Teaching & Mentoring', iconUrl: null },
      { name: 'Communication', iconUrl: null },
      { name: 'Problem Solving', iconUrl: null },
      { name: 'Team Collaboration', iconUrl: null },
      { name: 'Time Management', iconUrl: null },
      { name: 'Adaptability', iconUrl: null },
    ],
  },

]

export const MARQUEE_ITEMS = [
  'React.js', 'Node.js', 'MongoDB', 'Express', 'Python',
  'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git',
  'Cloudinary', 'Vite', 'MERN Stack', 'Bootstrap',
]

export const PROJECTS = [
  {
    _id: 'aspirantarena',
    title: 'AspirantArena',
    description: 'A full-stack exam preparation platform where students can practice quizzes, track syllabus progress, and analyze results.',
    longDesc: 'Built to make competitive exam preparation structured. Students take topic-wise quizzes, view analytics, and track syllabus coverage.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    githubUrl: 'https://github.com/alokabhina/Aspirant_Arena.git',
    liveUrl: 'https://aspirant-arena-app.vercel.app/',
    imageUrl: '/images/aspirantarena.jpg',
    featured: true,
    category: 'mern',
    features: [
      'Quiz practice system with timed tests',
      'Leaderboard and result tracking',
      'Topic-wise syllabus tracker',
      'Exam-based quiz organization',
    ],
  },
  {
    _id: 'saarthilearn',
    title: 'SaarthiLearn — LMS',
    description: 'A full-featured Learning Management System — my graduation final year project. Students enroll, watch video courses, and track progress.',
    longDesc: 'LMS with course management, video lectures, student enrollment, progress tracking, and admin panel.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    githubUrl: 'https://github.com/alokabhina/SaarthiLearn-Lms-Project.git',
    liveUrl: 'https://saarthi-learn-lms-project.vercel.app/',
    imageUrl: '/images/SaartiLearn.png',
    featured: false,
    category: 'mern',
    features: [
      'Course enrollment & video lectures',
      'Student progress tracking',
      'Admin content management',
      'Responsive UI',
    ],
  },
  {
    _id: 'spendyfy',
    title: 'Spendyfy — Expense Tracker',
    description: 'A clean personal expense tracker to manage daily spending, categorize expenses, and visualize monthly budget.',
    longDesc: 'Track income and expenses, categorize transactions, view monthly charts, manage personal budget.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/alokabhina/spend.git',
    liveUrl: 'https://spendyfy-expenses-trakcer.vercel.app/dashboard',
    imageUrl: '/images/Spendyfy.png',
    featured: false,
    category: 'mern',
    features: [
      'Income & expense tracking',
      'Category-wise breakdown',
      'Monthly budget charts',
      'Clean dashboard UI',
    ],
  },
]

export const EXPERIENCE = [
  {
    _id: 'acme-teaching',
    title: 'Full Stack & Python Instructor',
    organization: 'Acme Institute, Shahi Market, Gorakhpur',
    type: 'teaching',
    startDate: '10 June 2025',
    endDate: null,
    current: true,
    description: 'Teaching Full Stack Web Development (MERN Stack), Python Programming, and guiding students on AI Tools. Practical, project-based learning approach.',
    techUsed: ['React', 'Node.js', 'MongoDB', 'Python', 'AI Tools'],
    order: 1,
  },
  {
    _id: 'nielit-internship',
    title: 'MERN Stack Intern — S Grade',
    organization: 'NIELIT, Gorakhpur',
    type: 'work',
    startDate: '30 Dec 2025',
    endDate: '21 Feb 2026',
    current: false,
    description: 'Completed MERN Stack internship at NIELIT Gorakhpur. Received S Grade — the highest distinction. Worked on full-stack projects.',
    techUsed: ['React', 'Node.js', 'Express', 'MongoDB'],
    order: 2,
  },

  {
    _id: 'freelancer',
    title: 'Freelance Web Developer',
    organization: 'Self-Employed / Remote',
    type: 'freelance',
    startDate: 'From 2025',
    endDate: null,
    current: true,
    description: 'Freelance full-stack web development for clients — custom websites, landing pages, admin dashboards, and MERN applications. Also handling college final year projects and thesis documentation.',
    techUsed: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    order: 4,
  },
]

export const TIMELINE = [
  {
    year: '2020-2022',
    title: 'Class 12 — Air Force School, Gorakhpur',
    desc: 'Completed Class 12 from Air Force School, Gorakhpur.',
    side: 'left',
  },
  {
    year: '2022-25',
    title: 'BSc Computer Science — DDU Gorakhpur',
    desc: 'Bachelor of Science in CS from Deen Dayal Upadhyaya University, Gorakhpur.',
    side: 'right',
  },
  {
    year: '2025',
    title: 'NIELIT Internship — S Grade',
    desc: 'MERN Stack internship at NIELIT Gorakhpur. Awarded S Grade — highest distinction.',
    side: 'left',
  },
  {
    year: '2025',
    title: 'Instructor at Acme Institute',
    desc: 'Joined Acme Institute, Gorakhpur as Full Stack & Python Instructor. Also guiding students on AI tools.',
    side: 'right',
  },
  {
    year: '2026',
    title: 'AspirantArena & SaarthiLearn',
    desc: 'Launched AspirantArena exam platform and SaarthiLearn LMS (graduation project).',
    side: 'left',
  },
]

export const CERTIFICATIONS = [
  {
    _id: 'nielit-cert',
    title: 'MERN Stack Development — S Grade',
    issuer: 'NIELIT, Gorakhpur',
    date: '2023-12-01',
    imageUrl: '/certificates/Alok_Abhinandan_Internship_certificate.jpg',
    credentialUrl: null,
  },
  
{
  _id: 'acme-teaching-experience',
  title: 'Teaching & Internship Experience',
  issuer: 'Acme Institute of Computer Education',
  date: '2024-01-01',
  imageUrl: '/certificates/experience certificate.jpeg',
  credentialUrl: null,
},
  {
      _id: 'leadership',
    title: 'Certificate of Leadership',
    issuer: 'Great Learning',
    date: 'January 2024',
    imageUrl: '/certificates/Certificate_of_leadership_page.jpg',
    credentialUrl: null,
  },
  {
  _id: 'digital-marketing-cert',
  title: 'Introduction to Digital Marketing',
  issuer: 'Great Learning Academy',
  date: '2023-11-01',
  imageUrl: '/certificates/Certificate_of_DigitalMarketing.jpg',
  credentialUrl: null,
},

{
  _id: 'management-cert',
  title: 'Introduction to Management',
  issuer: 'Great Learning Academy',
  date: '2023-11-01',
  imageUrl: '/certificates/certificate_of_management_page.jpg',
  credentialUrl: null,
},

{
  _id: 'product-management-cert',
  title: 'Introduction to Product Management',
  issuer: 'LearnTube',
  date: '2023-11-01',
  imageUrl: '/certificates/Certificate_product.jpg',
  credentialUrl: null,
},

]

export const TEACHING = [
  {
    _id: 'mern',
    subject: 'MERN Stack Development',
    icon: '⚛',
    description: 'Full-stack web development with MongoDB, Express, React, and Node.js — from concept to deployment.',
    topics: ['React.js fundamentals', 'Node.js & Express APIs', 'MongoDB design', 'JWT Auth', 'Deployment'],
    accordionContent: [
      { title: 'Frontend (React)', items: ['Components & JSX', 'useState & useEffect', 'React Router', 'API integration', 'Tailwind CSS'] },
      { title: 'Backend (Node + Express)', items: ['REST API design', 'Middleware', 'MongoDB + Mongoose', 'JWT Auth', 'File uploads'] },
    ],
    order: 1,
  },
  {
    _id: 'python',
    subject: 'Python Programming',
    icon: '🐍',
    description: 'Fundamentals to intermediate Python — logic building, data structures, and practical scripting.',
    topics: ['Python syntax', 'Functions & OOP', 'File handling', 'Problem solving', 'Automation'],
    accordionContent: [
      { title: 'Basics', items: ['Variables & types', 'Conditions & loops', 'Functions', 'Lists & dicts'] },
      { title: 'Intermediate', items: ['OOP', 'File I/O', 'Error handling', 'Modules'] },
    ],
    order: 2,
  },
  {
    _id: 'aitools',
    subject: 'AI Tools Guidance',
    icon: '🤖',
    description: 'Practical guidance on using modern AI tools — ChatGPT, Copilot, and AI-powered productivity for developers.',
    topics: ['ChatGPT for devs', 'GitHub Copilot', 'Prompt engineering', 'AI workflows', 'Productivity tools'],
    accordionContent: [
      { title: 'AI Tools', items: ['ChatGPT', 'GitHub Copilot', 'Gemini', 'Midjourney basics'] },
    ],
    order: 3,
  },
  {
    _id: 'webfundamentals',
    subject: 'Web Fundamentals',
    icon: '🌐',
    description: 'HTML, CSS, JavaScript — the core building blocks every developer needs first.',
    topics: ['HTML5 semantic', 'CSS Flexbox & Grid', 'JS DOM', 'Responsive design', 'Git basics'],
    accordionContent: [
      { title: 'HTML + CSS', items: ['Semantic HTML', 'Flexbox', 'Grid', 'Media queries'] },
      { title: 'JavaScript', items: ['Variables & functions', 'DOM events', 'Fetch API', 'ES6+'] },
    ],
    order: 4,
  },
  {
    _id: 'olevel',
    subject: 'O Level (NIELIT)',
    icon: '🖥',
    description: 'NIELIT O Level computer science course — covering IT fundamentals, programming, and networking basics.',
    topics: ['IT Tools & Office', 'Internet & Web Tech', 'Python basics', 'Database basics', 'Linux fundamentals'],
    accordionContent: [
      { title: 'IT Fundamentals', items: ['Hardware & Software', 'OS concepts', 'MS Office', 'Internet tools'] },
      { title: 'Programming', items: ['Python basics', 'Problem solving', 'Algorithm basics'] },
    ],
    order: 5,
  },
  {
    _id: 'adca',
    subject: 'ADCA Course',
    icon: '💻',
    description: 'Advanced Diploma in Computer Applications — MS Office, DTP, Tally, Internet, and basic programming.',
    topics: ['MS Word & Excel', 'PowerPoint', 'Tally Prime', 'Internet & Email', 'DTP Basics'],
    accordionContent: [
      { title: 'Office Tools', items: ['MS Word', 'MS Excel', 'PowerPoint', 'Access'] },
      { title: 'Accounting', items: ['Tally Prime', 'Basic accounting', 'GST entries'] },
    ],
    order: 6,
  },
]

export const GALLERY_CATEGORIES = ['All', 'Teaching', 'Projects', 'Events', 'Personal','Travel']
export const GALLERY_PLACEHOLDER = [
  {
    _id: '1',
    imageUrl: '/images/alok-hero.jpg',
    title: 'Profile Portrait',
    category: 'personal',
    isPublic: true
  },
  {
    _id: '2',
    imageUrl: '/images/alok-about.jpg',
    title: 'About Section Portrait',
    category: 'personal',
    isPublic: true
  },
  {
    _id: '3',
    imageUrl: '/images/aspirantarena.jpg',
    title: 'AspirantArena Platform',
    category: 'projects',
    isPublic: true
  },
  {
    _id: '4',
    imageUrl: '/images/SaartiLearn.png',
    title: 'SaarthiLearn Platform',
    category: 'projects',
    isPublic: true
  },
  {
    _id: '5',
    imageUrl: '/images/Spendyfy.png',
    title: 'Spendyfy Expense Manager',
    category: 'projects',
    isPublic: true
  },
  {
    _id: '6',
    imageUrl: '/images/image_3.jpg',
    title: 'Personal Moment',
    category: 'personal',
    isPublic: true
  },
  {
    _id: '7',
    imageUrl: '/images/image_4.jpg',
    title: 'Personal Photo',
    category: 'personal',
    isPublic: true
  },
  {
    _id: '8',
    imageUrl: '/images/nepal_image.jpg',
    title: 'Nepal Trip',
    category: 'travel',
    isPublic: true
  }
]

export const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com/alokabhina', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/alok-abhinandan-866619241/', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://www.instagram.com/alok_abhinandan4', icon: 'instagram' },
  { platform: 'Email', url: 'mailto:alokabhinandan123@gmail.com', icon: 'mail' },
]

export const NAV_LINKS = [
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Services', href: '/services', sectionId: 'services' },
  { label: 'Skills', href: '/skills', sectionId: 'skills' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Teaching', href: '/teaching', sectionId: 'teaching' },
  { label: 'Experience', href: '/experience', sectionId: 'experience' },
  { label: 'Gallery', href: '/gallery', sectionId: 'gallery' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
]