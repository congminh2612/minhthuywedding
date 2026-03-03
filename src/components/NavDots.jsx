import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SECTIONS = [
  { id: 'hero',       label: 'Trang chủ' },
  { id: 'countdown',  label: 'Đếm ngược' },
  { id: 'lovestory',  label: 'Câu chuyện' },
  { id: 'message',    label: 'Lời yêu thương' },
  { id: 'gallery',    label: 'Bộ ảnh cưới' },
  { id: 'invitation', label: 'Thiệp mời' },
  { id: 'wishes',     label: 'Sổ lưu bút' },
]

export default function NavDots() {
  const [active, setActive] = useState(0)
  const [tapped, setTapped] = useState(null)

  useEffect(() => {
    const els = SECTIONS.map(({ id }) => document.getElementById(id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex(({ id }) => id === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.4 }
    )
    els.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id, i) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    // Hiện label khi tap trên mobile
    setTapped(i)
    setTimeout(() => setTapped(null), 1500)
  }

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-150 flex flex-col"
      style={{ paddingRight: 'max(12px, env(safe-area-inset-right))' }}
    >
      {SECTIONS.map((s, i) => (
        <div key={s.id} className="relative flex items-center justify-end group">

          {/* Tooltip — hover (desktop) hoặc tap (mobile) */}
          <AnimatePresence>
            {(tapped === i) && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-8 whitespace-nowrap text-[11px] tracking-widest text-white/80 bg-wine/85 backdrop-blur-sm px-3 py-1 pointer-events-none rounded-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {s.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tap target vô hình 44×44px bao quanh dot */}
          <button
            onClick={() => scrollTo(s.id, i)}
            aria-label={s.label}
            className="w-11 h-11 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              animate={{
                width:           active === i ? 20 : 6,
                height:          active === i ? 6  : 6,
                borderRadius:    active === i ? 3  : 9999,
                backgroundColor: active === i
                  ? 'rgba(201,160,85,0.95)'
                  : 'rgba(255,255,255,0.35)',
                boxShadow: active === i
                  ? '0 0 6px rgba(201,160,85,0.55)'
                  : 'none',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
