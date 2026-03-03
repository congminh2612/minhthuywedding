import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  { src: "/images/hero-1.png", pos: "center center" },
  { src: "/images/hero-2.png", pos: "center center" },
  { src: "/images/hero-3.png", pos: "center center" },
  { src: "/images/hero-4.jpg", pos: "center 55%"    },
];

const INTERVAL = 5000; // ms mỗi slide

function SplitText({ text, delay = 0 }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.55,
            ease: "easeOut",
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id='hero' className='relative h-dvh w-full overflow-hidden'>
      {/* Slideshow */}
      <AnimatePresence initial={false} mode='sync'>
        <motion.div
          key={current}
          className='absolute inset-0'
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <img
            src={SLIDES[current].src}
            alt={`Công Minh & Thanh Thùy — ${current + 1}`}
            className='h-full w-full object-cover'
            style={{ objectPosition: SLIDES[current].pos }}
            fetchpriority={current === 0 ? "high" : "low"}
            decoding='async'
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className='absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/65 pointer-events-none' />

      {/* Nội dung — căn dưới */}
      <div className='absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center text-white'>
        <div
          className='flex flex-col items-center leading-none'
          style={{
            fontFamily: "var(--font-script)",
            textShadow: "0 2px 24px rgba(0,0,0,0.25)",
          }}
        >
          <h1 className='text-5xl md:text-8xl lg:text-9xl'>
            <SplitText text='Công Minh' delay={0.3} />
          </h1>
          <motion.span
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
            className='text-2xl md:text-4xl text-white/60 my-1 md:my-2 block'
          >
            &amp;
          </motion.span>
          <h1 className='text-5xl md:text-8xl lg:text-9xl'>
            <SplitText text='Thanh Thùy' delay={1.0} />
          </h1>
        </div>

        {/* Đường kẻ vàng */}
        <div className='flex items-center gap-3 my-5'>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.9, ease: "easeInOut" }}
            className='h-px w-16 bg-gold/70 origin-right'
          />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.4 }}
            className='text-gold/80 text-xs'
          >
            ✦
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.9, ease: "easeInOut" }}
            className='h-px w-16 bg-gold/70 origin-left'
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className='text-base md:text-2xl tracking-[0.3em] font-light text-white/80'
          style={{ fontFamily: "var(--font-serif)" }}
        >
          15 . 03 . 2026
        </motion.p>
      </div>

      {/* Dots chỉ số slide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2'
      >
        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 24 : 6,
              backgroundColor:
                i === current
                  ? "rgba(201,160,85,0.9)"
                  : "rgba(255,255,255,0.4)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='h-[3px] rounded-full'
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className='absolute bottom-6 left-1/2 -translate-x-1/2'
        style={{ marginBottom: "2.5rem" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <div className='h-8 w-px bg-white/30 mx-auto' />
        </motion.div>
      </motion.div>
    </section>
  );
}
