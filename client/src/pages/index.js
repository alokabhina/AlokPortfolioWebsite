// NOTE: App.jsx imports pages directly with lazy() for code splitting.
// This file is kept as a reference map of all available pages.
// Do NOT import from here in App.jsx — it would break lazy loading.
//
// Direct imports (for use OUTSIDE App.jsx, e.g. in tests or SSR):

export { default as Home }           from './Home'
export { default as About }          from './About'
export { default as Skills }         from './Skills'
export { default as Projects }       from './Projects'
export { default as Teaching }       from './Teaching'
export { default as Experience }     from './Experience'
export { default as Gallery }        from './Gallery'
export { default as Contact }        from './Contact'
export { default as Blog }           from './Blog'
export { default as AdminLogin }     from './AdminLogin'
export { default as AdminDashboard } from './AdminDashboard'