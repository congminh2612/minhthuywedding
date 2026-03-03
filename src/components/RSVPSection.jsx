import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const fieldVariants = {
  hidden: { opacity: 0, x: 30 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function RSVPSection() {
  const [form, setForm] = useState({ name: '', attend: 'yes', guests: '1', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-24 md:py-36 px-6 bg-ivory overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-xs md:text-sm tracking-[0.45em] uppercase text-rose/70 mb-3">
          Tham dự
        </p>
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-light italic text-charcoal"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Xác nhận tham dự
        </h2>
        <div className="mx-auto mt-4 h-px w-12 bg-gold/40" />
      </motion.div>

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="text-center py-16 px-8 bg-white border border-blush/40 shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-5xl mb-5"
              >
                🌸
              </motion.div>
              <h3
                className="text-4xl font-light italic text-charcoal mb-3"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Cảm ơn bạn!
              </h3>
              <p className="text-base md:text-lg text-charcoal/55 leading-relaxed">
                Chúng mình rất vui khi nhận được xác nhận của bạn.
                <br />Hẹn gặp nhau vào ngày 15.03.2026!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white border border-blush/40 shadow-sm p-8 md:p-10 flex flex-col gap-6"
            >
              {/* Tên */}
              <motion.div custom={0} variants={fieldVariants} className="flex flex-col gap-2">
                <label className="text-xs md:text-sm tracking-[0.35em] uppercase text-charcoal/50">
                  Họ tên
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-b border-blush/60 bg-transparent py-2 text-base text-charcoal outline-none placeholder:text-charcoal/30 focus:border-rose transition-colors"
                  placeholder="Nguyễn Văn A"
                />
              </motion.div>

              {/* Tham dự */}
              <motion.div custom={1} variants={fieldVariants} className="flex flex-col gap-3">
                <label className="text-xs md:text-sm tracking-[0.35em] uppercase text-charcoal/50">
                  Bạn có tham dự không?
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {[['yes', 'Có, mình sẽ đến ✦'], ['no', 'Tiếc quá, không đến được']].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="attend"
                        value={val}
                        checked={form.attend === val}
                        onChange={(e) => setForm({ ...form, attend: e.target.value })}
                        className="accent-rose"
                      />
                      <span className="text-base text-charcoal/70">{label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Số người */}
              {form.attend === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  custom={2}
                  className="flex flex-col gap-2"
                >
                  <label className="text-xs md:text-sm tracking-[0.35em] uppercase text-charcoal/50">
                    Số người tham dự
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="border-b border-blush/60 bg-transparent py-2 text-base text-charcoal outline-none focus:border-rose transition-colors"
                  >
                    {['1', '2', '3', '4', '5+'].map((n) => (
                      <option key={n} value={n}>{n} người</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Lời nhắn */}
              <motion.div custom={3} variants={fieldVariants} className="flex flex-col gap-2">
                <label className="text-xs md:text-sm tracking-[0.35em] uppercase text-charcoal/50">
                  Lời nhắn (tuỳ chọn)
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="border-b border-blush/60 bg-transparent py-2 text-base text-charcoal outline-none placeholder:text-charcoal/30 resize-none focus:border-rose transition-colors"
                  placeholder="Gửi lời chúc mừng đến cô dâu chú rể..."
                />
              </motion.div>

              <motion.button
                custom={4}
                variants={fieldVariants}
                whileHover={{ backgroundColor: '#7B2436', scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 py-3 px-8 text-sm tracking-[0.4em] uppercase text-white transition-colors"
                style={{ backgroundColor: '#C4677B' }}
              >
                Gửi xác nhận
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
