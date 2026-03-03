import { motion } from 'motion/react'

const messages = [
  {
    role:   'Chú rể',
    name:   'Công Minh',
    avatar: '/images/chure.JPG',
    quote:
      'Em là điều bất ngờ đẹp nhất mà cuộc đời trao cho anh. Từ những tháng ngày cùng nhau ôn thi, cùng vượt qua bao sóng gió, đến hôm nay cùng nhau bước sang một chương mới — anh biết mình đã chọn đúng người. Hôm nay và mãi mãi, anh chọn em.',
  },
  {
    role:   'Cô dâu',
    name:   'Thanh Thùy',
    avatar: '/images/codau.JPG',
    quote:
      'Có những người bước vào cuộc đời mình và thay đổi tất cả — anh là người đó. Từ người bạn ngồi cùng lớp, anh trở thành tình yêu, rồi trở thành gia đình của em. Em trân trọng từng khoảnh khắc bên anh, và hôm nay em hạnh phúc được gọi anh là chồng.',
  },
]

function MessageCard({ msg, index }) {
  const isLeft = index === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.25, duration: 0.9, ease: 'easeOut' }}
      className="relative flex flex-col items-center text-center px-8 py-12 bg-white shadow-sm w-full"
    >
      {/* Viền trang trí góc */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold/40" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold/40" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold/40" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold/40" />

      {/* Avatar */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-blush/50 shadow-lg">
          <img
            src={msg.avatar}
            alt={msg.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Vòng ngoài mờ */}
        <div className="absolute inset-0 rounded-full border border-gold/25 scale-110" />
      </div>

      {/* Role */}
      <p className="text-[10px] tracking-[0.5em] uppercase text-rose/60 mb-1"
         style={{ fontFamily: 'var(--font-sans)' }}>
        {msg.role}
      </p>

      {/* Tên */}
      <p
        className="text-4xl text-charcoal mb-5 leading-none"
        style={{ fontFamily: 'var(--font-script)' }}
      >
        {msg.name}
      </p>

      {/* Dấu phân cách */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-px w-8 bg-gold/30" />
        <span className="text-gold/50 text-[10px]">✦</span>
        <div className="h-px w-8 bg-gold/30" />
      </div>

      {/* Quote */}
      <div className="relative">
        <span
          className="absolute -top-5 -left-2 text-7xl leading-none text-blush/30 select-none pointer-events-none"
          style={{ fontFamily: 'Georgia, serif' }}
          aria-hidden="true"
        >
          "
        </span>
        <p
          className="relative text-base md:text-lg font-light leading-loose text-charcoal/65 italic px-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {msg.quote}
        </p>
        <span
          className="absolute -bottom-8 -right-2 text-7xl leading-none text-blush/30 select-none pointer-events-none"
          style={{ fontFamily: 'Georgia, serif' }}
          aria-hidden="true"
        >
          "
        </span>
      </div>
    </motion.div>
  )
}

export default function MessageSection() {
  return (
    <section id="message" className="py-24 md:py-36 px-6 bg-ivory overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-[10px] md:text-xs tracking-[0.55em] uppercase text-rose/60 mb-3"
           style={{ fontFamily: 'var(--font-sans)' }}>
          Lời từ trái tim
        </p>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-light italic text-charcoal"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Lời Yêu Thương
        </h2>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-10 bg-gold/35" />
          <span className="text-gold/50 text-xs">✦</span>
          <div className="h-px w-10 bg-gold/35" />
        </div>
      </motion.div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {messages.map((msg, i) => (
          <MessageCard key={msg.role} msg={msg} index={i} />
        ))}
      </div>
    </section>
  )
}
