const express  = require('express')
const router   = express.Router()
const adminAuth = require('../middleware/adminAuth')
const { Blog } = require('../models')

// GET /api/blog — public, published posts only
router.get('/', async (req, res) => {
  try {
    const filter = { status: 'published' }
    if (req.query.tag) filter.tags = req.query.tag

    const posts = await Blog.find(filter)
      .select('-content') // Exclude full content from listing — only for detail page
      .sort({ publishedAt: -1 })

    res.json(posts)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/blog/all — admin, all posts (draft + published)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const posts = await Blog.find({}).select('-content').sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/blog/:slug — public, single post by slug (includes full content)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, status: 'published' })
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/blog — admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const post = await Blog.create(req.body)
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// PUT /api/blog/:id — admin (also handles publish/draft toggle)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' })

    Object.assign(post, req.body)
    await post.save() // Triggers pre-save hooks (slug, readTime, publishedAt)

    res.json({ success: true, data: post })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// DELETE /api/blog/:id — admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router