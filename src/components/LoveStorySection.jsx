import { motion } from "motion/react";

const events = [
  {
    date: "Năm 17 tuổi",
    title: "Lần đầu gặp nhau",
    description:
      "Ngày đó còn chẳng nhớ rõ ngày tháng, chỉ biết rằng khoảnh khắc hai đứa gặp nhau — có gì đó đã thay đổi mà cả hai chưa kịp nhận ra.",
  },
  {
    date: "2018",
    title: "Cùng bàn, cùng mộng",
    description:
      "Cùng học một lớp, cùng nhau ôn bài đến tận khuya, cùng mơ về giảng đường đại học. Những tháng ngày đó không chỉ là học — là lúc hai đứa bắt đầu hiểu nhau hơn bất kỳ ai.",
  },
  {
    date: "28 . 06 . 2018",
    title: "Chính thức yêu nhau",
    description:
      "Ngày 28 tháng 6 năm 2018 — ngày hai trái tim chính thức thuộc về nhau. Từ hôm đó, anh là của em và em là của anh.",
  },
  {
    date: "2019 — 2022",
    title: "Trưởng thành cùng nhau",
    description:
      "Chúng mình bước vào hai cánh cổng đại học khác nhau, nhưng vẫn may mắn ở gần nhau trong cùng một thành phố. Hai ngôi trường, hai con đường học tập, nhưng vẫn chung một thành phố để tìm về nhau. Giữa những ngày lịch học dày kín và những buổi chiều vội vã, chúng mình vẫn dành cho nhau những khoảnh khắc rất đỗi bình thường — mà sau này nhớ lại, hóa ra là cả một quãng thanh xuân. Và tình yêu, cứ thế lớn lên cùng năm tháng.",
  },
  {
    date: "2023",
    title: "Vượt qua khoảng cách",
    description:
      "Cuộc đời sau tốt nghiệp mở ra hai con đường khác nhau.Công việc kéo chúng mình về hai phía, xa nhau cả quãng đường lẫn nhịp thở thường ngày. Đã có những phút yếu lòng, những lần tưởng như buông tay. Nhưng tình yêu không chọn dễ dàng — tình yêu chọn bền bỉ. Và chúng mình, vẫn chọn nhau.",
  },
  {
    date: "2025",
    title: "Bọn mình quyết định về nhà cùng nhau",
    description: {
      groom: [
        "Anh muốn từ hôm nay và cả những ngày rất dài về sau, mọi điều trong cuộc sống của anh đều có em ở đó.",
        "Trong chiếc máy giặt nhỏ của chúng mình sẽ có cả áo sơ mi của anh lẫn chiếc váy của em.",
        "Trong tủ giày sẽ có giày thể thao của anh đặt cạnh đôi cao gót của em.",
        "Và mỗi buổi sáng thức dậy, điều đầu tiên anh thấy sẽ là em đang khẽ tựa đầu trong vòng tay anh.",
      ],
      bride: [
        "Ở thời điểm này, em biết mình đã sẵn sàng.",
        "Em sẽ khoác lên mình chiếc váy cưới đẹp nhất, để trao cả cuộc đời cho người em tin tưởng nhất — là anh.",
      ],
    },
  },
  {
    date: "14 . 03 . 2026",
    title: "Tiệc cỗ chính — 17:00",
    description:
      "Buổi tiệc sum họp gia đình và bạn bè thân thiết, cùng nhau đón chào một chương mới của cuộc đời chúng mình.",
  },
  {
    date: "15 . 03 . 2026",
    title: "Ngày cưới ✦",
    description:
      "Và hôm nay, trước mặt gia đình và những người thân yêu nhất, chúng mình cùng bước vào một chương đẹp nhất của cuộc đời.",
  },
];

/* ── Mobile card: single column, line on left ── */
function MobileCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      className='relative pl-8'
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.08 + 0.2,
          type: "spring",
          stiffness: 220,
        }}
        className='absolute left-0 top-4 w-2.5 h-2.5 -translate-x-[5px] rounded-full bg-gold border-2 border-cream shadow'
      />

      <div className='bg-white border border-blush/40 p-4 shadow-sm'>
        <p className='text-[10px] tracking-[0.3em] uppercase text-rose mb-1'>
          {event.date}
        </p>
        <h3
          className='text-lg font-light text-charcoal mb-2 leading-snug'
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {event.title}
        </h3>
        {event.description && typeof event.description === "object" && !Array.isArray(event.description) && "groom" in event.description ? (
          <>
            <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Chú rể</p>
            {event.description.groom.map((para, i) => (
              <p key={`g-${i}`} className='text-sm text-charcoal/55 leading-relaxed mt-2 first:mt-0'>
                {para}
              </p>
            ))}
            <div className='flex items-center gap-2 my-4'>
              <div className='flex-1 h-px bg-blush/40' />
              <span className='text-[10px] tracking-widest text-gold/60'>✦</span>
              <div className='flex-1 h-px bg-blush/40' />
            </div>
            <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Cô dâu</p>
            {event.description.bride.map((para, i) => (
              <p key={`b-${i}`} className='text-sm text-charcoal/55 leading-relaxed mt-2 first:mt-0'>
                {para}
              </p>
            ))}
          </>
        ) : Array.isArray(event.description) ? (
          event.description.map((para, i) => (
            <p
              key={i}
              className='text-sm text-charcoal/55 leading-relaxed mt-2 first:mt-0'
            >
              {para}
            </p>
          ))
        ) : (
          <p className='text-sm text-charcoal/55 leading-relaxed'>
            {event.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Desktop card: alternating left / right ── */
function DesktopCard({ event, index }) {
  const isLeft = index % 2 === 0;
  return (
    <div className='relative grid grid-cols-[1fr_auto_1fr] items-center'>
      <div className={isLeft ? "pr-12" : ""}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className='bg-white border border-blush/40 p-8 shadow-sm text-right'
          >
            <p className='text-xs tracking-[0.35em] uppercase text-rose mb-2'>
              {event.date}
            </p>
            <h3
              className='text-2xl md:text-3xl font-light text-charcoal mb-3'
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {event.title}
            </h3>
            {event.description && typeof event.description === "object" && !Array.isArray(event.description) && "groom" in event.description ? (
              <>
                <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Chú rể</p>
                {event.description.groom.map((para, i) => (
                  <p key={`g-${i}`} className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'>
                    {para}
                  </p>
                ))}
                <div className='flex items-center gap-2 my-5'>
                  <div className='flex-1 h-px bg-blush/40' />
                  <span className='text-[10px] tracking-widest text-gold/60'>✦</span>
                  <div className='flex-1 h-px bg-blush/40' />
                </div>
                <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Cô dâu</p>
                {event.description.bride.map((para, i) => (
                  <p key={`b-${i}`} className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'>
                    {para}
                  </p>
                ))}
              </>
            ) : Array.isArray(event.description) ? (
              event.description.map((para, i) => (
                <p
                  key={i}
                  className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'
                >
                  {para}
                </p>
              ))
            ) : (
              <p className='text-base text-charcoal/55 leading-relaxed'>
                {event.description}
              </p>
            )}
          </motion.div>
        )}
      </div>

      <div className='flex items-center justify-center z-10 px-3'>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className='w-3 h-3 rounded-full bg-gold border-2 border-cream shadow-md'
        />
      </div>

      <div className={!isLeft ? "pl-12" : ""}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className='bg-white border border-blush/40 p-8 shadow-sm text-left'
          >
            <p className='text-xs tracking-[0.35em] uppercase text-rose mb-2'>
              {event.date}
            </p>
            <h3
              className='text-2xl md:text-3xl font-light text-charcoal mb-3'
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {event.title}
            </h3>
            {event.description && typeof event.description === "object" && !Array.isArray(event.description) && "groom" in event.description ? (
              <>
                <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Chú rể</p>
                {event.description.groom.map((para, i) => (
                  <p key={`g-${i}`} className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'>
                    {para}
                  </p>
                ))}
                <div className='flex items-center gap-2 my-5'>
                  <div className='flex-1 h-px bg-blush/40' />
                  <span className='text-[10px] tracking-widest text-gold/60'>✦</span>
                  <div className='flex-1 h-px bg-blush/40' />
                </div>
                <p className='text-[10px] tracking-[0.35em] uppercase text-rose/70 mb-2'>Cô dâu</p>
                {event.description.bride.map((para, i) => (
                  <p key={`b-${i}`} className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'>
                    {para}
                  </p>
                ))}
              </>
            ) : Array.isArray(event.description) ? (
              event.description.map((para, i) => (
                <p
                  key={i}
                  className='text-base text-charcoal/55 leading-relaxed mt-3 first:mt-0'
                >
                  {para}
                </p>
              ))
            ) : (
              <p className='text-base text-charcoal/55 leading-relaxed'>
                {event.description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function LoveStorySection() {
  return (
    <section
      id='lovestory'
      className='py-20 md:py-36 px-5 md:px-6 bg-cream overflow-hidden'
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='text-center mb-14 md:mb-20'
      >
        <p className='text-[10px] md:text-sm tracking-[0.4em] uppercase text-rose/70 mb-3'>
          Hành trình của chúng mình
        </p>
        <h2
          className='text-3xl md:text-5xl lg:text-6xl font-light italic text-charcoal'
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Câu chuyện tình yêu
        </h2>
        <div className='mx-auto mt-4 h-px w-10 bg-gold/40' />
      </motion.div>

      {/* ── MOBILE layout ── */}
      <div className='md:hidden relative max-w-lg mx-auto'>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className='absolute left-0 top-0 bottom-0 w-px bg-blush/70 origin-top'
        />
        <div className='flex flex-col gap-7'>
          {events.map((event, i) => (
            <MobileCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className='hidden md:block relative max-w-3xl mx-auto'>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className='absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-blush/60 origin-top'
        />
        <div className='flex flex-col gap-12'>
          {events.map((event, i) => (
            <DesktopCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
