import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

/**
 * GalleryLightbox
 * Fullscreen image viewer with prev/next navigation.
 * Uses yet-another-react-lightbox.
 *
 * @param {Array}    images       - [{ imageUrl, title }]
 * @param {boolean}  isOpen       - Controls visibility
 * @param {number}   currentIndex - Which image to show first
 * @param {function} onClose      - Called when lightbox closes
 */
export default function GalleryLightbox({ images = [], isOpen, currentIndex = 0, onClose }) {
  if (!isOpen || images.length === 0) return null

  // yet-another-react-lightbox expects slides array with `src`
  const slides = images.map(img => ({
    src:   img.imageUrl,
    alt:   img.title || '',
    title: img.title || '',
  }))

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={slides}
      styles={{
        container: {
          backgroundColor: 'rgba(6, 10, 16, 0.96)',
        },
        button: {
          filter: 'none',
          color:  '#00D4AA',
        },
      }}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}