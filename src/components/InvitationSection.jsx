import { motion } from "motion/react";

const details = [
  {
    icon: "◎",
    label: "Tiệc cỗ — Nhà trai",
    time: "16:30 CH",
    date: "Thứ Bảy, 14 tháng 03 năm 2026",
    venue: "Tư gia nhà trai",
    address: "Thôn 1 Phương Trù, xã Tam Hồng, Phú Thọ",
  },
  {
    icon: "◎",
    label: "Tiệc cỗ — Nhà gái",
    time: "16:30 CH",
    date: "Thứ Bảy, 14 tháng 03 năm 2026",
    venue: "Tư gia nhà gái",
    address: "Tổ dân phố Hồng Hồ, xã Xuân Lãng, Phú Thọ",
  },
  {
    icon: "◇",
    label: "Lễ vu quy",
    time: "10:30 SA",
    date: "Chủ Nhật, 15 tháng 03 năm 2026",
    venue: "Tư gia nhà gái",
    address: "Tổ dân phố Hồng Hồ, xã Xuân Lãng, Phú Thọ",
  },
  {
    icon: "◈",
    label: "Lễ thành hôn",
    time: "11:00 SA",
    date: "Chủ Nhật, 15 tháng 03 năm 2026",
    venue: "Tư gia nhà trai",
    address: "Thôn 1, Phương Trù, xã Tam Hồng, Phú Thọ",
  },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function InvitationSection() {
  return (
    <section
      id='invitation'
      className='py-24 md:py-36 px-6 overflow-hidden'
      style={{ backgroundColor: "#EBF2F8" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='text-center mb-14'
      >
        <p className='text-xs md:text-sm tracking-[0.45em] uppercase text-rose/70 mb-3'>
          Trân trọng kính mời
        </p>
        <h2
          className='text-3xl md:text-5xl lg:text-6xl font-light italic text-charcoal'
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Thiệp mời
        </h2>
        <div className='mx-auto mt-4 h-px w-12 bg-gold/40' />
      </motion.div>

      {/* Card thiệp */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className='max-w-2xl mx-auto overflow-hidden shadow-lg'
        style={{
          backgroundColor: "#F5F9FD",
          border: "1px solid rgba(148,192,228,0.45)",
        }}
      >
        {/* Header */}
        <div
          className='py-10 px-10 text-center'
          style={{ backgroundColor: "#1B3054" }}
        >
          <h3
            className='text-4xl md:text-6xl text-white mb-3'
            style={{ fontFamily: "var(--font-script)" }}
          >
            Công Minh & Thanh Thùy
          </h3>
          <p
            className='text-xs tracking-[0.4em] uppercase text-gold/60 mb-3'
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Cùng hai gia đình trân trọng thông báo
          </p>
          <p
            className='mt-2 text-base md:text-lg font-light italic text-white/85'
            style={{ fontFamily: "var(--font-serif)" }}
          >
            trân trọng kính mời bạn tham dự lễ cưới của chúng mình
          </p>
        </div>

        {/* Ornament */}
        <div className='flex items-center justify-center gap-3 py-5 border-b border-sky-200/40'>
          <div className='h-px w-16 bg-gold/30' />
          <span className='text-gold/50 text-sm'>✦</span>
          <div className='h-px w-16 bg-gold/30' />
        </div>

        {/* Chi tiết — chia 2 hàng theo ngày */}
        <motion.div
          variants={listVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='px-6 md:px-12 py-8'
        >
          {/* Nhãn ngày 14/03 */}
          <motion.p
            variants={itemVariants}
            className='text-center text-xs tracking-[0.45em] uppercase text-gold mb-6'
          >
            ✦ Thứ Bảy — 14 tháng 03 năm 2026 ✦
          </motion.p>

          {/* Hàng 1: tiệc cỗ */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
            {details.slice(0, 2).map((d) => (
              <motion.div
                key={d.label}
                variants={itemVariants}
                className='text-center'
              >
                <span className='text-gold/50 text-xl'>{d.icon}</span>
                <p className='text-xs tracking-[0.38em] uppercase text-rose/70 mt-2 mb-2'>
                  {d.label}
                </p>
                <p
                  className='text-3xl md:text-4xl font-light text-charcoal mb-1'
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {d.time}
                </p>
                <div className='h-px w-8 bg-gold/30 mx-auto my-2' />
                <p
                  className='text-base md:text-lg font-light text-charcoal'
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {d.venue}
                </p>
                <p className='text-xs md:text-sm text-charcoal/45 mt-1 leading-relaxed'>
                  {d.address}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Đường kẻ phân cách ngày */}
          <motion.div
            variants={itemVariants}
            className='flex items-center gap-3 my-6'
          >
            <div className='flex-1 h-px bg-sky-200/50' />
            <span className='text-gold/40 text-xs'>✦</span>
            <div className='flex-1 h-px bg-sky-200/50' />
          </motion.div>

          {/* Nhãn ngày 15/03 */}
          <motion.p
            variants={itemVariants}
            className='text-center text-xs tracking-[0.45em] uppercase text-gold mb-6'
          >
            ✦ Chủ Nhật — 15 tháng 03 năm 2026 ✦
          </motion.p>

          {/* Hàng 2: lễ vu quy & thành hôn */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {details.slice(2, 4).map((d) => (
              <motion.div
                key={d.label}
                variants={itemVariants}
                className='text-center'
              >
                <span className='text-gold/50 text-xl'>{d.icon}</span>
                <p className='text-xs tracking-[0.38em] uppercase text-rose/70 mt-2 mb-2'>
                  {d.label}
                </p>
                <p
                  className='text-3xl md:text-4xl font-light text-charcoal mb-1'
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {d.time}
                </p>
                <div className='h-px w-8 bg-gold/30 mx-auto my-2' />
                <p
                  className='text-base md:text-lg font-light text-charcoal'
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {d.venue}
                </p>
                <p className='text-xs md:text-sm text-charcoal/45 mt-1 leading-relaxed'>
                  {d.address}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className='border-t border-sky-200/35 py-5 text-center'>
          <a
            href='https://maps.google.com'
            target='_blank'
            rel='noreferrer'
            className='text-xs md:text-sm tracking-[0.35em] uppercase text-rose/60 hover:text-rose transition-colors'
          >
            Xem bản đồ →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
