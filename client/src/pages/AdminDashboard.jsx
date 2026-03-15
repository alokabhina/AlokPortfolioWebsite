import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  LayoutDashboard, FolderKanban, Image, Briefcase,
  BookOpen, MessageSquare, FileText, Lock,
  LogOut, Menu, X, Plus, Trash2, Edit2,
  Eye, EyeOff, Upload, BarChart2, Award,
  ChevronDown, CheckCircle
} from 'lucide-react'
import { SEO } from '@/components'
import { api } from '@/lib'
import { formatDate } from '@/lib'

// ── Toast helpers ─────────────────────────────────────────────
const toastOk  = (msg) => toast.success(msg, { style:{ background:'var(--bg-card)', color:'var(--text-heading)', border:'1px solid var(--accent)' }, iconTheme:{ primary:'#00D4AA', secondary:'#060A10' } })
const toastErr = (msg) => toast.error(msg,   { style:{ background:'var(--bg-card)', color:'var(--text-heading)', border:'1px solid #EF4444' } })

// ── Sidebar nav items ─────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'overview',      label: 'Overview',       icon: LayoutDashboard },
  { id: 'projects',      label: 'Projects',        icon: FolderKanban    },
  { id: 'gallery',       label: 'Gallery',         icon: Image           },
  { id: 'experience',    label: 'Experience',      icon: Briefcase       },
  { id: 'certifications',label: 'Certificates',    icon: Award           },
  { id: 'skills',        label: 'Skills',          icon: BookOpen        },
  { id: 'teaching',      label: 'Teaching',        icon: BookOpen        },
  { id: 'messages',      label: 'Messages',        icon: MessageSquare   },
  { id: 'vault',         label: 'Personal Vault',  icon: Lock            },
  { id: 'testimonials',  label: 'Testimonials',    icon: MessageSquare   },
  { id: 'leads',         label: 'Leads',           icon: MessageSquare   },
  { id: 'analytics',     label: 'Analytics',       icon: BarChart2       },
]

// ── Reusable components ───────────────────────────────────────
function SectionHeader({ title, onAdd, addLabel = 'Add New' }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display font-bold text-xl"
        style={{ color:'var(--text-heading)', letterSpacing:'-0.02em' }}>
        {title}
      </h2>
      {onAdd && (
        <button onClick={onAdd} className="btn-primary text-sm">
          <Plus size={15}/> {addLabel}
        </button>
      )}
    </div>
  )
}

function AdminCard({ children, className = '' }) {
  return (
    <div className={`p-5 rounded-xl ${className}`}
      style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
      {children}
    </div>
  )
}

function EmptyState({ message = 'No items yet.' }) {
  return (
    <div className="py-16 text-center font-mono text-sm"
      style={{ color:'var(--text-secondary)' }}>
      {message}
    </div>
  )
}

function LoadingRows() {
  return (
    <div className="flex flex-col gap-3">
      {[1,2,3].map(i => (
        <div key={i} className="h-14 rounded-lg animate-pulse"
          style={{ background:'var(--bg-secondary)' }}/>
      ))}
    </div>
  )
}

// ── Overview panel ────────────────────────────────────────────
function OverviewPanel({ admin }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/api/analytics').then(r => setStats(r.data?.data)).catch(()=>{})
  }, [])

  const cards = [
    { label:'Total Visits',  value: stats?.totalVisits  ?? '—' },
    { label:'Last 30 Days',  value: stats?.recentVisits ?? '—' },
    { label:'Top Page',      value: stats?.topPages?.[0]?.page ?? '—' },
    { label:'New Messages',  value: '—' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl mb-1"
          style={{ color:'var(--text-heading)', letterSpacing:'-0.02em' }}>
          Welcome back, {admin?.name?.split(' ')[0] || 'Admin'} 👋
        </h2>
        <p className="text-sm" style={{ color:'var(--text-secondary)' }}>
          {admin?.email}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <AdminCard key={c.label}>
            <p className="font-mono text-xs mb-2" style={{ color:'var(--text-secondary)' }}>{c.label}</p>
            <p className="font-display font-bold text-2xl" style={{ color:'var(--accent)' }}>{c.value}</p>
          </AdminCard>
        ))}
      </div>

      {stats?.topPages?.length > 0 && (
        <AdminCard>
          <p className="font-mono text-xs mb-4" style={{ color:'var(--accent)' }}>TOP PAGES</p>
          <div className="flex flex-col gap-2">
            {stats.topPages.map(p => (
              <div key={p.page} className="flex items-center justify-between">
                <span className="font-mono text-sm" style={{ color:'var(--text-primary)' }}>{p.page}</span>
                <span className="font-mono text-sm font-bold" style={{ color:'var(--accent)' }}>{p.count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  )
}

// ── Projects panel ────────────────────────────────────────────
function ProjectsPanel() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [form,     setForm]     = useState(null) // null=list, {}=add/edit
  const fileRef = useRef()

  const load = async () => {
    setLoading(true)
    try { const r = await api.get('/api/projects'); setProjects(r.data) }
    catch { toastErr('Failed to load projects') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try { await api.delete(`/api/projects/${id}`); toastOk('Deleted'); load() }
    catch { toastErr('Delete failed') }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    fd.set('techStack', JSON.stringify(fd.get('techStack').split(',').map(s=>s.trim()).filter(Boolean)))
    fd.set('features',  JSON.stringify(fd.get('features').split('\n').map(s=>s.trim()).filter(Boolean)))
    try {
      if (form._id) await api.put(`/api/projects/${form._id}`, fd, { headers:{'Content-Type':'multipart/form-data'} })
      else          await api.post('/api/projects', fd, { headers:{'Content-Type':'multipart/form-data'} })
      toastOk(form._id ? 'Project updated!' : 'Project added!')
      setForm(null); load()
    } catch (err) { toastErr(err.response?.data?.message || 'Save failed') }
  }

  if (form !== null) return (
    <div>
      <button onClick={()=>setForm(null)} className="mb-5 font-mono text-sm flex items-center gap-2"
        style={{color:'var(--accent)'}}> ← Back to list </button>
      <AdminCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            ['title','Title *','text',true],
            ['description','Short Description *','text',true],
            ['githubUrl','GitHub URL','text',false],
            ['liveUrl','Live URL','text',false],
          ].map(([name,label,type,req])=>(
            <div key={name}>
              <label className="font-mono text-xs mb-1 block" style={{color:'var(--text-secondary)'}}>{label}</label>
              <input name={name} type={type} required={req} defaultValue={form[name]||''}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}
                onFocus={e=>e.target.style.borderColor='var(--accent)'}
                onBlur={e=>e.target.style.borderColor='var(--border)'}/>
            </div>
          ))}
          <div>
            <label className="font-mono text-xs mb-1 block" style={{color:'var(--text-secondary)'}}>Tech Stack (comma separated)</label>
            <input name="techStack" defaultValue={form.techStack?.join(', ')||''}
              className="w-full px-4 py-2.5 rounded-lg text-sm"
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
          </div>
          <div>
            <label className="font-mono text-xs mb-1 block" style={{color:'var(--text-secondary)'}}>Features (one per line)</label>
            <textarea name="features" rows={3} defaultValue={form.features?.join('\n')||''}
              className="w-full px-4 py-2.5 rounded-lg text-sm resize-y"
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-mono text-xs" style={{color:'var(--text-secondary)'}}>
              <input type="checkbox" name="featured" defaultChecked={form.featured} className="mr-2"/>
              Featured project
            </label>
            <select name="category" defaultValue={form.category||'mern'}
              className="px-3 py-1.5 rounded-lg text-sm font-mono"
              style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}>
              {['mern','python','frontend','other'].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-xs mb-1 block" style={{color:'var(--text-secondary)'}}>Project Screenshot</label>
            <input type="file" name="image" accept="image/*" ref={fileRef}
              className="font-mono text-xs" style={{color:'var(--text-secondary)'}}/>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">{form._id?'Update':'Add Project'}</button>
            <button type="button" onClick={()=>setForm(null)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </AdminCard>
    </div>
  )

  return (
    <div>
      <SectionHeader title="Projects" onAdd={()=>setForm({})} addLabel="Add Project"/>
      {loading ? <LoadingRows/> : projects.length === 0 ? <EmptyState message="No projects yet."/> : (
        <div className="flex flex-col gap-3">
          {projects.map(p=>(
            <AdminCard key={p._id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {p.imageUrl && <img src={p.imageUrl} alt="" className="w-12 h-10 object-cover rounded-lg shrink-0"/>}
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate" style={{color:'var(--text-heading)'}}>{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-full"
                      style={{background:'var(--accent-dim)',color:'var(--accent)'}}>{p.category}</span>
                    {p.featured && <span className="font-mono text-[11px]" style={{color:'#4ade80'}}>★ Featured</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={()=>setForm(p)} className="p-2 rounded-lg transition-colors"
                  style={{color:'var(--text-secondary)'}} title="Edit"
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                  <Edit2 size={15}/>
                </button>
                <button onClick={()=>handleDelete(p._id)} className="p-2 rounded-lg transition-colors"
                  style={{color:'var(--text-secondary)'}} title="Delete"
                  onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                  <Trash2 size={15}/>
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Gallery panel ─────────────────────────────────────────────
function GalleryPanel() {
  const [images,  setImages]  = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading,setUploading]=useState(false)

  const load = async () => {
    setLoading(true)
    try { const r = await api.get('/api/gallery/all'); setImages(r.data) }
    catch { toastErr('Failed to load gallery') }
    finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  const handleUpload = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setUploading(true)
    try {
      await api.post('/api/gallery', fd, { headers:{'Content-Type':'multipart/form-data'} })
      toastOk('Image uploaded!'); e.target.reset(); load()
    } catch (err) { toastErr(err.response?.data?.message || 'Upload failed') }
    finally { setUploading(false) }
  }

  const toggleVisibility = async (img) => {
    try {
      await api.put(`/api/gallery/${img._id}`, { isPublic: !img.isPublic })
      toastOk(img.isPublic ? 'Set to Private' : 'Set to Public')
      load()
    } catch { toastErr('Update failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await api.delete(`/api/gallery/${id}`); toastOk('Deleted'); load() }
    catch { toastErr('Delete failed') }
  }

  return (
    <div>
      <SectionHeader title="Gallery" />

      {/* Upload form */}
      <AdminCard className="mb-6">
        <p className="font-mono text-xs mb-4" style={{color:'var(--accent)'}}>UPLOAD NEW IMAGE</p>
        <form onSubmit={handleUpload} className="flex flex-wrap gap-3 items-end">
          <input type="file" name="image" accept="image/*" required
            className="font-mono text-xs" style={{color:'var(--text-secondary)'}}/>
          <input name="title" placeholder="Title (optional)"
            className="px-3 py-2 rounded-lg text-sm flex-1 min-w-[160px]"
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
          <select name="category"
            className="px-3 py-2 rounded-lg text-sm font-mono"
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}>
            {['teaching','projects','events','personal','other'].map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 font-mono text-xs cursor-pointer" style={{color:'var(--text-secondary)'}}>
            <input type="checkbox" name="isPublic" defaultChecked/>
            Public
          </label>
          <button type="submit" disabled={uploading} className="btn-primary">
            <Upload size={15}/>{uploading ? 'Uploading…' : 'Upload'}
          </button>
        </form>
      </AdminCard>

      {/* Image grid */}
      {loading ? <LoadingRows/> : images.length===0 ? <EmptyState message="No images yet."/> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map(img=>(
            <div key={img._id} className="relative group rounded-xl overflow-hidden"
              style={{border:'1px solid var(--border)',aspectRatio:'1'}}>
              <img src={img.imageUrl} alt={img.title||''} className="w-full h-full object-cover"/>
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"
                style={{background:'rgba(6,10,16,0.75)'}}>
                <div className="flex justify-end gap-1">
                  <button onClick={()=>toggleVisibility(img)}
                    className="p-1.5 rounded-lg" style={{background:'rgba(0,212,170,0.15)',color:'var(--accent)'}}>
                    {img.isPublic ? <Eye size={13}/> : <EyeOff size={13}/>}
                  </button>
                  <button onClick={()=>handleDelete(img._id)}
                    className="p-1.5 rounded-lg" style={{background:'rgba(239,68,68,0.15)',color:'#EF4444'}}>
                    <Trash2 size={13}/>
                  </button>
                </div>
                <div>
                  {img.title && <p className="font-mono text-[11px] truncate" style={{color:'#EAF4FF'}}>{img.title}</p>}
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{background: img.isPublic ? 'var(--accent)' : '#EF4444', color:'var(--bg-primary)'}}>
                    {img.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Messages panel ────────────────────────────────────────────
function MessagesPanel() {
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(()=>{
    api.get('/api/contact').then(r=>{ setMessages(r.data?.data||[]); setLoading(false) }).catch(()=>setLoading(false))
  },[])

  const markRead = async (id) => {
    try { await api.put(`/api/contact/${id}/read`); setMessages(m=>m.map(x=>x._id===id?{...x,isRead:true}:x)) }
    catch { toastErr('Failed to mark read') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try { await api.delete(`/api/contact/${id}`); setMessages(m=>m.filter(x=>x._id!==id)); toastOk('Deleted') }
    catch { toastErr('Delete failed') }
  }

  return (
    <div>
      <SectionHeader title="Contact Messages"/>
      {loading ? <LoadingRows/> : messages.length===0 ? <EmptyState message="No messages yet."/> : (
        <div className="flex flex-col gap-3">
          {messages.map(msg=>(
            <AdminCard key={msg._id}
              className={msg.isRead ? '' : ''}
              style={{borderColor: msg.isRead ? 'var(--border)' : 'var(--accent)'}}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="font-mono text-xs" style={{color:'var(--accent)'}}>{msg.email}</a>
                    {!msg.isRead && <span className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{background:'var(--accent)',color:'var(--bg-primary)'}}>New</span>}
                    <span className="font-mono text-[11px]" style={{color:'var(--text-secondary)'}}>{formatDate(msg.createdAt)}</span>
                  </div>
                  {msg.subject && <p className="text-sm font-medium mb-1" style={{color:'var(--text-primary)'}}>{msg.subject}</p>}
                  <button onClick={()=>setExpanded(expanded===msg._id?null:msg._id)}
                    className="font-mono text-xs flex items-center gap-1" style={{color:'var(--text-secondary)'}}>
                    {expanded===msg._id ? 'Hide' : 'Read message'}
                    <ChevronDown size={12} style={{transform:expanded===msg._id?'rotate(180deg)':'none',transition:'0.2s'}}/>
                  </button>
                  <AnimatePresence>
                    {expanded===msg._id && (
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                        transition={{duration:0.25}} style={{overflow:'hidden'}}>
                        <p className="mt-3 text-sm leading-relaxed p-3 rounded-lg" style={{color:'var(--text-primary)',background:'var(--bg-secondary)'}}>
                          {msg.message}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  {!msg.isRead && (
                    <button onClick={()=>markRead(msg._id)} className="p-1.5 rounded-lg transition-colors" title="Mark read"
                      style={{color:'var(--text-secondary)'}}
                      onMouseEnter={e=>e.currentTarget.style.color='#4ade80'}
                      onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                      <CheckCircle size={15}/>
                    </button>
                  )}
                  <button onClick={()=>handleDelete(msg._id)} className="p-1.5 rounded-lg transition-colors" title="Delete"
                    style={{color:'var(--text-secondary)'}}
                    onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                    <Trash2 size={15}/>
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Vault panel ───────────────────────────────────────────────
function VaultPanel() {
  const [files,    setFiles]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [uploading,setUploading]= useState(false)

  const load = async () => {
    setLoading(true)
    try { const r = await api.get('/api/vault'); setFiles(r.data?.data||[]) }
    catch { toastErr('Failed to load vault') }
    finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  const handleUpload = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setUploading(true)
    try {
      await api.post('/api/vault', fd, { headers:{'Content-Type':'multipart/form-data'} })
      toastOk('File uploaded to vault!'); e.target.reset(); load()
    } catch (err) { toastErr(err.response?.data?.message || 'Upload failed') }
    finally { setUploading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this file from vault?')) return
    try { await api.delete(`/api/vault/${id}`); toastOk('File deleted'); load() }
    catch { toastErr('Delete failed') }
  }

  const formatSize = (bytes) => {
    if (!bytes) return '—'
    if (bytes < 1024)       return `${bytes} B`
    if (bytes < 1024*1024)  return `${(bytes/1024).toFixed(1)} KB`
    return `${(bytes/1024/1024).toFixed(1)} MB`
  }

  return (
    <div>
      <SectionHeader title="Personal Vault" />
      <AdminCard className="mb-6">
        <p className="font-mono text-xs mb-4" style={{color:'var(--accent)'}}>UPLOAD FILE</p>
        <form onSubmit={handleUpload} className="flex flex-wrap gap-3 items-end">
          <input type="file" name="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" required
            className="font-mono text-xs" style={{color:'var(--text-secondary)'}}/>
          <select name="folder"
            className="px-3 py-2 rounded-lg text-sm font-mono"
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}>
            {['work','personal','certificates','notes'].map(f=><option key={f} value={f}>{f}</option>)}
          </select>
          <input name="notes" placeholder="Notes (optional)"
            className="px-3 py-2 rounded-lg text-sm flex-1 min-w-[160px]"
            style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
          <button type="submit" disabled={uploading} className="btn-primary">
            <Lock size={15}/>{uploading ? 'Uploading…' : 'Upload to Vault'}
          </button>
        </form>
      </AdminCard>

      {loading ? <LoadingRows/> : files.length===0 ? <EmptyState message="Vault is empty."/> : (
        <div className="flex flex-col gap-3">
          {files.map(f=>(
            <AdminCard key={f._id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{background:'var(--accent-dim)'}}>
                  <FileText size={18} style={{color:'var(--accent)'}}/>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate" style={{color:'var(--text-heading)'}}>{f.fileName}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[11px]" style={{color:'var(--text-secondary)'}}>{f.folder}</span>
                    <span className="font-mono text-[11px]" style={{color:'var(--text-secondary)'}}>{formatSize(f.size)}</span>
                    <span className="font-mono text-[11px]" style={{color:'var(--text-secondary)'}}>{formatDate(f.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={f.fileUrl} target="_blank" rel="noopener noreferrer"
                  download
                  className="p-2 rounded-lg transition-colors" title="View/Download"
                  style={{color:'var(--text-secondary)'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                  <Eye size={15}/>
                </a>
                <button onClick={()=>handleDelete(f._id)}
                  className="p-2 rounded-lg transition-colors" title="Delete"
                  style={{color:'var(--text-secondary)'}}
                  onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                  <Trash2 size={15}/>
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Simple CRUD panel factory ─────────────────────────────────
function SimpleCrudPanel({ title, endpoint, fields = [], renderItem }) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [form,    setForm]    = useState(null)

  const load = async () => {
    setLoading(true)
    try { const r = await api.get(endpoint); setItems(Array.isArray(r.data) ? r.data : r.data?.data || []) }
    catch { toastErr('Failed to load') }
    finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    try { await api.delete(`${endpoint}/${id}`); toastOk('Deleted'); load() }
    catch { toastErr('Delete failed') }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(e.target))
    try {
      if (form._id) await api.put(`${endpoint}/${form._id}`, body)
      else          await api.post(endpoint, body)
      toastOk(form._id ? 'Updated!' : 'Added!'); setForm(null); load()
    } catch (err) { toastErr(err.response?.data?.message || 'Save failed') }
  }

  if (form !== null) return (
    <div>
      <button onClick={()=>setForm(null)} className="mb-5 font-mono text-sm" style={{color:'var(--accent)'}}>← Back</button>
      <AdminCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(f=>(
            <div key={f.name}>
              <label className="font-mono text-xs mb-1 block" style={{color:'var(--text-secondary)'}}>{f.label}</label>
              {f.type==='textarea' ? (
                <textarea name={f.name} defaultValue={form[f.name]||''} rows={3} required={f.required}
                  className="w-full px-4 py-2.5 rounded-lg text-sm resize-y"
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
              ) : f.type==='select' ? (
                <select name={f.name} defaultValue={form[f.name]||f.options[0]}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-mono"
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}>
                  {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input name={f.name} type={f.type||'text'} defaultValue={form[f.name]||''} required={f.required}
                  className="w-full px-4 py-2.5 rounded-lg text-sm"
                  style={{background:'var(--bg-secondary)',border:'1px solid var(--border)',color:'var(--text-heading)'}}/>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">{form._id?'Update':'Add'}</button>
            <button type="button" onClick={()=>setForm(null)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </AdminCard>
    </div>
  )

  return (
    <div>
      <SectionHeader title={title} onAdd={()=>setForm({})}/>
      {loading ? <LoadingRows/> : items.length===0 ? <EmptyState/> : (
        <div className="flex flex-col gap-3">
          {items.map(item=>(
            <AdminCard key={item._id} className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">{renderItem(item)}</div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={()=>setForm(item)} className="p-2 rounded-lg" style={{color:'var(--text-secondary)'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}><Edit2 size={15}/></button>
                <button onClick={()=>handleDelete(item._id)} className="p-2 rounded-lg" style={{color:'var(--text-secondary)'}}
                  onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}><Trash2 size={15}/></button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}


// ── Testimonials panel ────────────────────────────────────────
function TestimonialsPanel() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try { const r = await api.get('/api/testimonials/all'); setItems(r.data||[]) }
    catch { toastErr('Failed to load') }
    finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  const approve = async (id) => {
    try { await api.put(`/api/testimonials/${id}`, { isVisible: true }); toastOk('Approved!'); load() }
    catch { toastErr('Failed') }
  }
  const remove = async (id) => {
    if (!confirm('Delete?')) return
    try { await api.delete(`/api/testimonials/${id}`); toastOk('Deleted'); load() }
    catch { toastErr('Failed') }
  }

  const pending   = items.filter(t => !t.isVisible)
  const approved  = items.filter(t => t.isVisible)

  return (
    <div>
      <SectionHeader title="Testimonials"/>
      {loading ? <LoadingRows/> : (
        <>
          {pending.length > 0 && (
            <div style={{marginBottom:'24px'}}>
              <p style={{fontFamily:'DM Mono, monospace', fontSize:'11px', color:'#f59e0b', marginBottom:'12px'}}>
                ⏳ Pending Approval ({pending.length})
              </p>
              <div className="flex flex-col gap-3">
                {pending.map(t=>(
                  <AdminCard key={t._id} style={{borderColor:'#f59e0b'}}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{t.name}</span>
                          {t.role && <span className="font-mono text-xs" style={{color:'var(--text-secondary)'}}>{t.role}</span>}
                        </div>
                        <p className="text-sm" style={{color:'var(--text-secondary)',fontStyle:'italic'}}>"{t.content}"</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={()=>approve(t._id)} className="p-2 rounded-lg" style={{color:'var(--text-secondary)',background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)'}}
                          onMouseEnter={e=>e.currentTarget.style.color='#4ade80'}
                          onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>✓</button>
                        <button onClick={()=>remove(t._id)} className="p-2 rounded-lg" style={{color:'var(--text-secondary)'}}
                          onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                          onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}><Trash2 size={15}/></button>
                      </div>
                    </div>
                  </AdminCard>
                ))}
              </div>
            </div>
          )}
          {approved.length === 0 && pending.length === 0 ? <EmptyState message="No testimonials yet."/> : null}
          {approved.length > 0 && (
            <div>
              <p style={{fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--accent)', marginBottom:'12px'}}>
                ✅ Approved ({approved.length})
              </p>
              <div className="flex flex-col gap-3">
                {approved.map(t=>(
                  <AdminCard key={t._id} className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{t.name}</span>
                        {t.role && <span className="font-mono text-xs" style={{color:'var(--text-secondary)'}}>{t.role}</span>}
                      </div>
                      <p className="text-sm" style={{color:'var(--text-secondary)',fontStyle:'italic'}}>"{t.content}"</p>
                    </div>
                    <button onClick={()=>remove(t._id)} className="p-2 rounded-lg shrink-0" style={{color:'var(--text-secondary)'}}
                      onMouseEnter={e=>e.currentTarget.style.color='#EF4444'}
                      onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}><Trash2 size={15}/></button>
                  </AdminCard>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}


// ── Leads panel ───────────────────────────────────────────────
function LeadsPanel() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    api.get('/api/analytics/leads').then(r=>{
      setLeads(r.data?.data||[])
      setLoading(false)
    }).catch(()=>setLoading(false))
  },[])

  return (
    <div>
      <SectionHeader title="Visitor Leads"/>
      <p style={{fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--text-secondary)', marginBottom:'16px'}}>
        People who left their contact info via the popup.
      </p>
      {loading ? <LoadingRows/> : leads.length===0 ? <EmptyState message="No leads yet. Popup will collect them."/> : (
        <div className="flex flex-col gap-3">
          {leads.map((lead,i)=>(
            <AdminCard key={lead._id||i} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{lead.name}</p>
                <div className="flex flex-wrap gap-3 mt-1">
                  {lead.phone && <span style={{fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--accent)'}}>{lead.phone}</span>}
                  {lead.email && <span style={{fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--text-secondary)'}}>{lead.email}</span>}
                  <span style={{fontFamily:'DM Mono, monospace', fontSize:'10px', color:'var(--border)'}}>from: {lead.page}</span>
                </div>
              </div>
              <span style={{fontFamily:'DM Mono, monospace', fontSize:'10px', color:'var(--text-secondary)', flexShrink:0}}>
                {new Date(lead.createdAt).toLocaleDateString('en-IN')}
              </span>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Panel renderer ────────────────────────────────────────────
function PanelContent({ activePanel, admin }) {
  switch (activePanel) {
    case 'overview':   return <OverviewPanel admin={admin}/>
    case 'projects':   return <ProjectsPanel/>
    case 'gallery':    return <GalleryPanel/>
    case 'messages':   return <MessagesPanel/>
    case 'vault':      return <VaultPanel/>
    case 'experience': return (
      <SimpleCrudPanel title="Experience" endpoint="/api/experience"
        fields={[
          {name:'title',       label:'Job Title *',    required:true},
          {name:'organization',label:'Organization *', required:true},
          {name:'type',        label:'Type',           type:'select', options:['work','teaching','freelance']},
          {name:'startDate',   label:'Start Date',     type:'date'},
          {name:'description', label:'Description',    type:'textarea'},
          {name:'techUsed',    label:'Tech Used (comma separated)'},
        ]}
        renderItem={item=>(
          <div>
            <p className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{item.title}</p>
            <p className="font-mono text-xs mt-0.5" style={{color:'var(--accent)'}}>{item.organization}</p>
          </div>
        )}
      />
    )
    case 'skills': return (
      <SimpleCrudPanel title="Skills" endpoint="/api/skills"
        fields={[
          {name:'name',     label:'Skill Name *', required:true},
          {name:'category', label:'Category',     type:'select', options:['programming','webdev','tools','other']},
          {name:'iconUrl',  label:'Devicon URL (optional)'},
        ]}
        renderItem={item=>(
          <div className="flex items-center gap-3">
            {item.iconUrl && <img src={item.iconUrl} alt="" width={20} height={20}/>}
            <div>
              <p className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{item.name}</p>
              <p className="font-mono text-xs" style={{color:'var(--text-secondary)'}}>{item.category}</p>
            </div>
          </div>
        )}
      />
    )
    case 'teaching': return (
      <SimpleCrudPanel title="Teaching Subjects" endpoint="/api/teaching"
        fields={[
          {name:'subject',     label:'Subject Name *', required:true},
          {name:'icon',        label:'Icon (emoji)'},
          {name:'description', label:'Description',    type:'textarea'},
        ]}
        renderItem={item=>(
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <p className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{item.subject}</p>
          </div>
        )}
      />
    )
    case 'certifications': return (
      <SimpleCrudPanel title="Certifications" endpoint="/api/certifications"
        fields={[
          {name:'title',  label:'Certificate Title *', required:true},
          {name:'issuer', label:'Issuing Organization *', required:true},
          {name:'date',   label:'Date', type:'date'},
          {name:'credentialUrl', label:'Credential URL (optional)'},
        ]}
        renderItem={item=>(
          <div>
            <p className="font-medium text-sm" style={{color:'var(--text-heading)'}}>{item.title}</p>
            <p className="font-mono text-xs mt-0.5" style={{color:'var(--accent)'}}>{item.issuer}</p>
          </div>
        )}
      />
    )
    case 'testimonials': return (
      <TestimonialsPanel/>
    )
        case 'leads': return (
      <LeadsPanel/>
    )
        case 'analytics': return (
      <div>
        <SectionHeader title="Analytics"/>
        <p className="text-sm" style={{color:'var(--text-secondary)'}}>
          Visit stats shown in the Overview panel. More detailed analytics coming soon.
        </p>
      </div>
    )
    default: return <OverviewPanel admin={admin}/>
  }
}

// ── Main AdminDashboard ───────────────────────────────────────
export default function AdminDashboard() {
  const navigate      = useNavigate()
  const [admin,       setAdmin]       = useState(null)
  const [activePanel, setActivePanel] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(()=>{
    api.get('/api/auth/me')
      .then(r => setAdmin(r.data?.admin))
      .catch(()=> navigate('/admin-login', { replace: true }))
  },[])

  const handleLogout = async () => {
    try { await api.post('/api/auth/logout') } catch {}
    navigate('/admin-login', { replace: true })
  }

  const handleNav = (id) => {
    setActivePanel(id)
    setSidebarOpen(false)
  }

  return (
    <>
      <SEO title="Admin Dashboard" path="/admin-dashboard"/>

      <div className="min-h-screen flex" style={{background:'var(--bg-primary)'}}>

        {/* ── Sidebar ── */}
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden"
              style={{background:'rgba(6,10,16,0.7)'}}
              onClick={()=>setSidebarOpen(false)}/>
          )}

          <aside className={`
            fixed top-0 left-0 bottom-0 z-50 w-64 flex flex-col transition-transform duration-300
            lg:relative lg:translate-x-0 lg:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
            style={{background:'var(--bg-card)', borderRight:'1px solid var(--border)'}}>

            {/* Logo */}
            <div className="flex items-center justify-between px-5 h-16"
              style={{borderBottom:'1px solid var(--border)'}}>
              <span className="font-display font-extrabold text-lg"
                style={{color:'var(--text-heading)', letterSpacing:'-0.03em'}}>
                {'<'}<span style={{color:'var(--accent)'}}>Admin</span>{' />'}
              </span>
              <button className="lg:hidden" onClick={()=>setSidebarOpen(false)}
                style={{color:'var(--text-secondary)'}}>
                <X size={18}/>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {NAV_ITEMS.map(item=>{
                const Icon = item.icon
                const isActive = activePanel === item.id
                return (
                  <button key={item.id} onClick={()=>handleNav(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left transition-colors duration-150"
                    style={{
                      background: isActive ? 'var(--accent-dim)' : 'transparent',
                      color:      isActive ? 'var(--accent)'     : 'var(--text-secondary)',
                    }}>
                    <Icon size={16}/>
                    <span className="font-mono text-sm">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* Admin info + logout */}
            <div className="p-4" style={{borderTop:'1px solid var(--border)'}}>
              {admin && (
                <div className="mb-3">
                  <p className="font-medium text-sm truncate" style={{color:'var(--text-heading)'}}>{admin.name}</p>
                  <p className="font-mono text-xs truncate" style={{color:'var(--text-secondary)'}}>{admin.email}</p>
                </div>
              )}
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm transition-colors"
                style={{color:'var(--text-secondary)'}}
                onMouseEnter={e=>{e.currentTarget.style.color='#EF4444';e.currentTarget.style.background='rgba(239,68,68,0.08)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='transparent'}}>
                <LogOut size={15}/> Logout
              </button>
            </div>
          </aside>
        </>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="flex items-center gap-4 px-6 h-16 shrink-0"
            style={{borderBottom:'1px solid var(--border)',background:'var(--bg-card)'}}>
            <button className="lg:hidden" onClick={()=>setSidebarOpen(true)}
              style={{color:'var(--text-secondary)'}}>
              <Menu size={20}/>
            </button>
            <h1 className="font-display font-bold text-base capitalize"
              style={{color:'var(--text-heading)'}}>
              {NAV_ITEMS.find(n=>n.id===activePanel)?.label || 'Dashboard'}
            </h1>
          </header>

          {/* Panel */}
          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activePanel}
                initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                transition={{duration:0.25,ease:[0.4,0,0.2,1]}}>
                <PanelContent activePanel={activePanel} admin={admin}/>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}