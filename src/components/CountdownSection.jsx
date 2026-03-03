import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const WEDDING_DATE = new Date('2026-03-15T00:00:00')

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE - new Date())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function Ring({ value, max, label, delay }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / max)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-28 h-28 md:w-36 md:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(201,160,85,0.12)" strokeWidth="1.5" />
          <motion.circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#C9A055"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3, duration: 1.4, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-4xl md:text-5xl font-light text-gold tabular-nums"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/35">
        {label}
      </span>
    </motion.div>
  )
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="countdown"
      className="py-24 md:py-36 px-6 text-center"
      style={{ backgroundColor: '#0E060B' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16"
      >
        <p className="text-xs md:text-sm tracking-[0.45em] uppercase text-gold/50 mb-4">
          Đếm ngược
        </p>
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 italic"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Còn bao lâu nữa thôi...
        </h2>
        <div className="mx-auto mt-5 h-px w-12 bg-gold/30" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-14">
        <Ring value={time.days}    max={365} label="Ngày"  delay={0} />
        <Ring value={time.hours}   max={24}  label="Giờ"   delay={0.1} />
        <Ring value={time.minutes} max={60}  label="Phút"  delay={0.2} />
        <Ring value={time.seconds} max={60}  label="Giây"  delay={0.3} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-16 text-sm md:text-base tracking-widest text-white/25 italic"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        15 tháng 03 năm 2026
      </motion.p>
    </section>
  )
}
