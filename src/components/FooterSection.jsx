import { motion } from 'motion/react'

const venues = [
  { label: 'Tiệc cỗ & Lễ thành hôn — Nhà trai', address: 'Thôn 1, Phương Trù, xã Tam Hồng, Phú Thọ' },
  { label: 'Tiệc cỗ & Lễ vu quy — Nhà gái',     address: 'Tổ dân phố Hồng Hồ, xã Xuân Lãng, Phú Thọ' },
]

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #140810 0%, #2a0d1a 55%, #140810 100%)' }}>
      {/* Glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 15% 90%, rgba(196,103,123,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 85% 10%, rgba(201,160,85,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Ornament trên */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-16 bg-gold/30" />
          <span className="text-gold/50 text-sm">✦</span>
          <div className="h-px w-16 bg-gold/30" />
        </motion.div>

        {/* Lời kết */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[10px] tracking-[0.55em] uppercase text-blush/50 mb-6"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Trân trọng kính mời
        </motion.p>

        {/* Tên đôi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          style={{ fontFamily: 'var(--font-script)' }}
        >
          <h2 className="text-6xl md:text-7xl text-white leading-none">Công Minh</h2>
          <p className="text-xl text-white/30 my-2">&amp;</p>
          <h2 className="text-6xl md:text-7xl text-white leading-none">Thanh Thùy</h2>
        </motion.div>

        {/* Ngày & Câu kết */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 mb-12"
        >
          <p
            className="text-sm tracking-[0.4em] text-gold/70 mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            15 . 03 . 2026
          </p>
          <p
            className="text-lg md:text-xl font-light italic text-white/40 leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Hẹn gặp lại trong ngày vui của chúng mình.
          </p>
        </motion.div>

        {/* Địa điểm */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="w-full border border-white/10 p-6 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
        >
          {venues.map((v) => (
            <div key={v.label}>
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold/50 mb-1"
                 style={{ fontFamily: 'var(--font-sans)' }}>
                {v.label}
              </p>
              <p className="text-sm text-white/50 leading-relaxed"
                 style={{ fontFamily: 'var(--font-serif)' }}>
                {v.address}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Ornament dưới */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-gold/20" />
          <span className="text-gold/30 text-xs">✦</span>
          <div className="h-px w-10 bg-gold/20" />
        </motion.div>

        {/* Copyright nhỏ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 text-[10px] tracking-widest text-white/15 uppercase"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Made with love · 2026
        </motion.p>
      </div>
    </footer>
  )
}
