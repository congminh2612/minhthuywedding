import { useState, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const photos = [
  { src: '/images/gallery-1.jpg',   caption: 'Khoảnh khắc ngọt ngào' },
  { src: '/images/gallery-2%20.jpg', caption: 'Chỉ có anh và em' },
  { src: '/images/gallery-3.jpg',   caption: 'Bên nhau trên mọi nẻo đường' },
  { src: '/images/gallery-4.jpg',   caption: 'Hạnh phúc thật giản dị' },
  { src: '/images/gallery-5.jpg',   caption: 'Ngày đẹp nhất cuộc đời' },
  { src: '/images/gallery-6.jpg',   caption: 'Lưu giữ từng khoảnh khắc' },
  { src: '/images/gallery-7.jpg',   caption: 'Tình yêu mãi xanh' },
  { src: '/images/gallery-8.jpg',   caption: 'Cùng nhau mãi mãi' },
]

const TOTAL = photos.length

function getOffset(index, active) {
  let off = index - active
  if (off > TOTAL / 2)  off -= TOTAL
  if (off < -TOTAL / 2) off += TOTAL
  return off
}

function slideStyle(off) {
  const abs = Math.abs(off)
  if (abs > 2) return { opacity: 0,   scale: 0.4,  x: `${off * 95}%`, zIndex: 0,  pointerEvents: 'none' }
  if (abs === 2) return { opacity: 0.3, scale: 0.55, x: `${off * 78}%`, zIndex: 2,  pointerEvents: 'none' }
  if (abs === 1) return { opacity: 0.6, scale: 0.72, x: `${off * 65}%`, zIndex: 5,  pointerEvents: 'auto' }
  return           { opacity: 1,   scale: 1.22, x: '0%',            zIndex: 10, pointerEvents: 'auto' }
}

export default function GallerySection() {
  const [active,  setActive]  = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [dragStart, setDragStart] = useState(null)

  const prev = useCallback(() => setActive((a) => (a - 1 + TOTAL) % TOTAL), [])
  const next = useCallback(() => setActive((a) => (a + 1) % TOTAL), [])

  // Auto-advance mỗi 3s
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 3000)
    return () => clearInterval(id)
  }, [paused, next])

  // Swipe support
  const onTouchStart = (e) => setDragStart(e.touches[0].clientX)
  const onTouchEnd   = (e) => {
    if (dragStart === null) return
    const diff = dragStart - e.changedTouches[0].clientX
    if (diff > 40)  next()
    if (diff < -40) prev()
    setDragStart(null)
  }

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#0E060B', touchAction: 'pan-y' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 md:mb-20 lg:mb-24 px-6"
      >
        <p className="text-xs md:text-sm tracking-[0.45em] uppercase text-gold/60 mb-3">
          Bộ ảnh cưới
        </p>
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-light italic text-white/90"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Khoảnh khắc của chúng mình
        </h2>
        <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
      </motion.div>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 'clamp(340px, 58vh, 640px)' }}
      >
        {photos.map((photo, i) => {
          const off   = getOffset(i, active)
          const style = slideStyle(off)

          // Không render slide hoàn toàn ẩn
          if (Math.abs(off) > 2) return null

          return (
            <motion.div
              key={photo.src}
              className="absolute cursor-pointer select-none"
              style={{
                width:      'clamp(200px, 30vw, 420px)',
                height:     '100%',
                willChange: 'transform, opacity',
              }}
              animate={{
                x:       style.x,
                scale:   style.scale,
                opacity: style.opacity,
                zIndex:  style.zIndex,
              }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => off !== 0 && setActive(i)}
            >
              {/* Ảnh */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={off === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: off === 0 ? 'brightness(1)' : 'brightness(0.65)',
                    transition: 'filter 0.5s ease',
                    willChange: 'filter',
                  }}
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

                {/* Caption — chỉ hiện ở slide active */}
                <AnimatePresence>
                  {off === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-6 left-4 right-4 text-center"
                    >
                      <p
                        className="text-white text-lg md:text-2xl font-light italic drop-shadow"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {photo.caption}
                      </p>
                      <div className="mx-auto mt-2 h-px w-10 bg-gold/70" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Viền vàng khi active */}
                {off === 0 && (
                  <motion.div
                    layoutId="active-border"
                    className="absolute inset-0 border border-gold/40"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
