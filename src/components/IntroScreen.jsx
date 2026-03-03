import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* URLs trùng với HeroSection để preload trước khi mở thiệp */
const HERO_PRELOAD_URLS = [
  '/images/hero-1.png',
  '/images/hero-2.png',
  '/images/hero-3.png',
  '/images/hero-4.jpg',
]

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 92}%`,
  delay: (i * 0.4) % 6,
  duration: 5 + (i * 0.7) % 5,
  size: 6 + (i * 3) % 10,
  rotate: (i * 37) % 360,
}))

function FallingPetal({ petal }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none select-none"
      style={{ left: petal.left, fontSize: petal.size }}
      initial={{ y: -40, opacity: 0, rotate: petal.rotate }}
      animate={{ y: '110vh', opacity: [0, 0.7, 0.7, 0], rotate: petal.rotate + 180 }}
      transition={{
        duration: petal.duration,
        delay: petal.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🌸
    </motion.div>
  )
}

function preloadFirstHeroImage(urls) {
  return new Promise((resolve) => {
    if (!urls.length) return resolve()
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = urls[0]
  })
}

export default function IntroScreen({ onEnter }) {
  const [visible, setVisible] = useState(true)
  const [pulse, setPulse] = useState(false)
  const [loading, setLoading] = useState(false)
  const firstImageReadyRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 2800)
    return () => clearTimeout(t)
  }, [])

  // Preload hero ảnh ngay khi màn intro hiện — ảnh đầu tiên dùng để chờ trước khi mở
  useEffect(() => {
    firstImageReadyRef.current = preloadFirstHeroImage(HERO_PRELOAD_URLS)
    HERO_PRELOAD_URLS.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const handleEnter = async () => {
    if (loading) return
    setLoading(true)
    const timeout = new Promise((r) => setTimeout(r, 2800))
    await Promise.race([firstImageReadyRef.current || Promise.resolve(), timeout])
    setVisible(false)
    setTimeout(() => {
      onEnter()
      setLoading(false)
    }, 900)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, y: '-6%', scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #140810 0%, #2a0d1a 50%, #140810 100%)' }}
        >
          {/* Soft radial glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(196,103,123,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(201,160,85,0.12) 0%, transparent 60%)',
            }}
          />

          {/* Falling petals */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PETALS.map((p) => <FallingPetal key={p.id} petal={p} />)}
          </div>

          {/* Card nội dung */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-sm"
               style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>

            {/* Ornament trên */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-14 bg-gold/35" />
              <span className="text-gold/50 text-base">✦</span>
              <div className="h-px w-14 bg-gold/35" />
            </motion.div>

            {/* Lời mời */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[10px] tracking-[0.55em] uppercase text-blush/60 mb-5"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Trân trọng kính mời
            </motion.p>

            {/* Tên cô dâu chú rể */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              style={{ fontFamily: 'var(--font-script)' }}
            >
              <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl text-white leading-none">
                Công Minh
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-xl text-white/30 my-2"
              >
                &amp;
              </motion.p>
              <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl text-white leading-none">
                Thanh Thùy
              </h1>
            </motion.div>

            {/* Ngày cưới */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex items-center gap-3 my-5"
            >
              <div className="h-px w-10 bg-gold/30" />
              <p
                className="text-sm tracking-[0.4em] text-gold/70"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                15 . 03 . 2026
              </p>
              <div className="h-px w-10 bg-gold/30" />
            </motion.div>

            {/* Nút Mở thiệp */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              <motion.button
                onClick={handleEnter}
                disabled={loading}
                animate={!loading && pulse ? { boxShadow: ['0 0 0 0 rgba(201,160,85,0)', '0 0 0 10px rgba(201,160,85,0.15)', '0 0 0 0 rgba(201,160,85,0)'] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={!loading ? { scale: 1.04 } : {}}
                whileTap={!loading ? { scale: 0.96 } : {}}
                className="group relative px-10 py-4 min-h-[52px] border border-gold/45 text-gold/80 hover:text-gold hover:border-gold/80 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
                style={{ fontFamily: 'var(--font-sans)', cursor: loading ? 'wait' : 'pointer' }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-gold/50 border-t-gold"
                    />
                    <span className="text-[11px] tracking-[0.4em] uppercase text-gold/70">
                      Đang mở thiệp...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] tracking-[0.5em] uppercase">Mở thiệp</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                      className="ml-2 inline-block text-gold/60 group-hover:text-gold transition-colors"
                    >
                      ✦
                    </motion.span>
                  </>
                )}
                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/60 -translate-x-px -translate-y-px" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/60 translate-x-px -translate-y-px" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/60 -translate-x-px translate-y-px" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/60 translate-x-px translate-y-px" />
              </motion.button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
