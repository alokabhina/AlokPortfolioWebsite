import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO, GalleryGrid, GalleryLightbox, RevealOnScroll } from '@/components'
import { GALLERY_CATEGORIES, GALLERY_PLACEHOLDER } from '@/data/content'
import { api } from '@/lib'

export default function Gallery() {
  const [images,       setImages]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeImg,    setActiveImg]    = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()

  // Category from URL query param — e.g. /gallery?category=teaching
  const activeCategory = searchParams.get('category') || 'All'

  // Fetch public images from API — fallback to static data
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await api.get('/api/gallery')
        setImages(data?.length ? data : GALLERY_PLACEHOLDER)
      } catch {
        setImages(GALLERY_PLACEHOLDER)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  // Filter by category
  const filtered = useMemo(() => {
    if (activeCategory === 'All') return images
    return images.filter(
      img => img.category?.toLowerCase() === activeCategory.toLowerCase()
    )
  }, [images, activeCategory])

  // Handle category change — updates URL param
  const setCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ category: cat })
    }
  }

  // Open lightbox at clicked image index (within filtered array)
  const handleImageClick = (idx) => {
    setActiveImg(idx)
    setLightboxOpen(true)
  }

  return (
    <>
      <SEO
        title="Gallery"
        description="Photos and visuals from Alok Abhinandan's teaching sessions, projects, and events."
        path="/gallery"
      />

      <main className="page-top">
        <section className="section-pad">
          <div className="container-main">

            {/* Header */}
            <RevealOnScroll>
              <p className="section-tag">07. Gallery</p>
              <h1
                className="font-display font-extrabold mb-4"
                style={{
                  fontSize:      'clamp(2rem, 4vw, 3rem)',
                  color:         'var(--text-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                Moments &amp;{' '}
                <span style={{ color: 'var(--accent)' }}>Memories</span>
              </h1>
              <p
                className="text-base mb-10"
                style={{ color: 'var(--text-secondary)' }}
              >
                Teaching sessions, project screenshots, events, and more.
              </p>
            </RevealOnScroll>

            {/* Category filter tabs */}
            <RevealOnScroll delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-10">
                {GALLERY_CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
                      style={{
                        background: isActive ? 'var(--accent)'     : 'var(--bg-card)',
                        color:      isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                        border:     `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </RevealOnScroll>

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl animate-pulse"
                    style={{
                      height:     `${160 + (i % 3) * 60}px`,
                      background: 'var(--bg-card)',
                      border:     '1px solid var(--border)',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Gallery grid with filter animation */}
            {!loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  <GalleryGrid
                    images={filtered}
                    onImageClick={handleImageClick}
                  />
                </motion.div>
              </AnimatePresence>
            )}

          </div>
        </section>
      </main>

      {/* Lightbox — portal-level, outside section */}
      <GalleryLightbox
        images={filtered}
        isOpen={lightboxOpen}
        currentIndex={activeImg}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}