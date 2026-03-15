import Masonry from 'react-masonry-css'
import { LazyImage } from '@/components'

/**
 * GalleryGrid
 * Pinterest-style masonry grid.
 * Each image: LazyImage + hover teal overlay + category tag.
 * Clicking an image calls onImageClick(index).
 *
 * @param {Array}    images        - [{ _id, imageUrl, title, category }]
 * @param {function} onImageClick  - Called with image index
 */
export default function GalleryGrid({ images = [], onImageClick }) {
  const breakpoints = {
    default: 4,
    1280:    4,
    1024:    3,
    768:     2,
    640:     2,
    480:     1,
  }

  if (images.length === 0) {
    return (
      <div
        className="py-24 text-center font-mono text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        No images in this category yet.
      </div>
    )
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-4 w-full"
      columnClassName="flex flex-col gap-4"
    >
      {images.map((img, idx) => (
        <GalleryItem
          key={img._id || idx}
          image={img}
          onClick={() => onImageClick(idx)}
        />
      ))}
    </Masonry>
  )
}

// ── Single gallery item ───────────────────────────────────────
function GalleryItem({ image, onClick }) {
  const { imageUrl, title, category } = image

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      style={{ border: '1px solid var(--border)' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${title || 'image'}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      {/* Image with blur-up lazy load */}
      <LazyImage
        src={imageUrl}
        alt={title || ''}
        wrapClass="w-full relative"
        className="w-full h-auto block"
        style={{ display: 'block' }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(6,10,16,0.85) 0%, rgba(6,10,16,0.3) 60%, transparent 100%)',
        }}
      >
        {/* Category badge */}
        {category && (
          <span
            className="self-start font-mono text-[11px] px-2.5 py-0.5 rounded-full capitalize mb-1"
            style={{
              background: 'var(--accent)',
              color:      'var(--bg-primary)',
              fontWeight: 600,
            }}
          >
            {category}
          </span>
        )}

        {/* Title */}
        {title && (
          <p
            className="font-display font-semibold text-sm"
            style={{ color: '#EAF4FF' }}
          >
            {title}
          </p>
        )}
      </div>

      {/* Zoom hint icon */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
        style={{ background: 'rgba(0,212,170,0.15)', backdropFilter: 'blur(4px)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
    </div>
  )
}