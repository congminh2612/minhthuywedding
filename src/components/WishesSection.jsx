import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const MAX_CHARS = 300
const PAGE_SIZE = 6


/* ── Confetti ── */
const CONFETTI_COLORS = ['#C4677B', '#C9A055', '#EDCDD4', '#F3E8D7', '#7B2436', '#ffffff']

function useConfetti() {
  const [particles, setParticles] = useState([])

  const burst = useCallback(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: Date.now() + i,
      x: 45 + Math.random() * 10,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 5 + Math.random() * 6,
      vx: (Math.random() - 0.5) * 280,
      vy: -(180 + Math.random() * 220),
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2200)
  }, [])

  return { particles, burst }
}

function ConfettiParticle({ p }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: `${p.x}%`,
        width: p.shape === 'circle' ? p.size : p.size * 0.7,
        height: p.shape === 'circle' ? p.size : p.size * 1.4,
        borderRadius: p.shape === 'circle' ? '50%' : '2px',
        backgroundColor: p.color,
        zIndex: 50,
      }}
      initial={{ y: 0, x: 0, opacity: 1, rotate: p.rotate }}
      animate={{
        y: [0, p.vy * 0.6, p.vy * 0.6 + 400],
        x: [0, p.vx * 0.6, p.vx],
        opacity: [1, 1, 0],
        rotate: p.rotate + 540,
      }}
      transition={{ duration: 1.8 + Math.random() * 0.4, ease: 'easeIn' }}
    />
  )
}

/* ── Wish Card ── */
function WishCard({ wish, index }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = wish.message.length > 160

  return (
    <motion.div
      key={wish.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5, ease: 'easeOut' }}
      className="break-inside-avoid bg-white border border-blush/30 shadow-sm p-6 flex flex-col gap-3"
    >
      {/* Message */}
      <div className="relative">
        <p
          className={`text-sm md:text-base leading-relaxed text-charcoal/70 italic wrap-break-word transition-all duration-300 ${!expanded && isLong ? 'line-clamp-5' : ''}`}
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          "{wish.message}"
        </p>
        {/* Fade overlay khi clamp */}
        {isLong && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Nút xem thêm / thu gọn */}
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] tracking-widest uppercase text-rose/60 hover:text-rose transition-colors text-left"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {expanded ? '↑ Thu gọn' : '↓ Xem thêm'}
        </button>
      )}

      <div className="h-px w-8 bg-gold/30" />

      {/* Tên — truncate nếu quá dài */}
      <p
        className="text-xl text-rose/80 truncate"
        title={wish.name}
        style={{ fontFamily: 'var(--font-script)' }}
      >
        {wish.name}
      </p>
    </motion.div>
  )
}

/* ── Lưu & load từ localStorage ── */
function loadWishes() {
  try {
    return JSON.parse(localStorage.getItem('wedding_wishes') || '[]')
  } catch {
    return []
  }
}

/* ── Main component ── */
export default function WishesSection() {
  const [wishes, setWishes] = useState(loadWishes)
  const [form, setForm] = useState({ name: '', message: '' })
  const [sent, setSent] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { particles, burst } = useConfetti()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    const newWish = {
      id:      Date.now(),
      name:    form.name.trim(),
      message: form.message.trim(),
      rotate:  (Math.random() - 0.5) * 6,
    }
    const updated = [newWish, ...wishes]
    setWishes(updated)
    localStorage.setItem('wedding_wishes', JSON.stringify(updated))
    setForm({ name: '', message: '' })
    setSent(true)
    burst()
    setVisibleCount((v) => Math.max(v, PAGE_SIZE))
    setTimeout(() => setSent(false), 3000)
  }

  const visibleWishes = wishes.slice(0, visibleCount)
  const hasMore = visibleCount < wishes.length

  return (
    <section id="wishes" className="py-24 md:py-36 px-6 overflow-hidden" style={{ backgroundColor: '#FDF6EE' }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.45em] uppercase text-rose/70 mb-3"
           style={{ fontFamily: 'var(--font-sans)' }}>
          Lời yêu thương
        </p>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-light italic text-charcoal"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Sổ lưu bút
        </h2>
        <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
        <p className="mt-3 text-sm text-charcoal/40 italic"
           style={{ fontFamily: 'var(--font-serif)' }}>
          {wishes.length > 0
            ? `${wishes.length} lời chúc đã gửi`
            : 'Hãy để lại lời chúc cho bọn mình nhé'}
        </p>
      </motion.div>

      {/* Form */}
      <div className="relative max-w-lg mx-auto mb-16">
        {particles.map((p) => <ConfettiParticle key={p.id} p={p} />)}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-blush/40 shadow-sm p-8 flex flex-col gap-5"
        >
          <input
            required
            maxLength={50}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-b border-blush/60 bg-transparent py-2 text-base text-charcoal outline-none placeholder:text-charcoal/30 focus:border-rose transition-colors"
            placeholder="Tên của bạn"
          />

          <div className="relative">
            <textarea
              required
              rows={3}
              maxLength={MAX_CHARS}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-b border-blush/60 bg-transparent py-2 text-base text-charcoal outline-none placeholder:text-charcoal/30 resize-none focus:border-rose transition-colors"
              placeholder="Gửi lời chúc đến Công Minh & Thanh Thùy..."
            />
            {/* Bộ đếm ký tự */}
            <span className={`absolute bottom-2 right-0 text-[11px] tabular-nums transition-colors ${form.message.length >= MAX_CHARS - 20 ? 'text-rose/70' : 'text-charcoal/25'}`}>
              {form.message.length}/{MAX_CHARS}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-rose italic"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Cảm ơn bạn rất nhiều! 🌸
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ backgroundColor: '#7B2436' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="ml-auto py-2 px-7 text-sm tracking-[0.4em] uppercase text-white transition-colors shrink-0"
              style={{ backgroundColor: '#C4677B' }}
            >
              Gửi
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Danh sách lời chúc */}
      {wishes.length > 0 && (
        <>
          <div className="max-w-4xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence>
              {visibleWishes.map((wish, i) => (
                <WishCard key={wish.id} wish={wish} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="px-10 py-3 border border-blush/50 text-xs tracking-[0.4em] uppercase text-charcoal/50 hover:border-rose/50 hover:text-rose/70 transition-all duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Xem thêm ({wishes.length - visibleCount} lời chúc)
              </motion.button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
