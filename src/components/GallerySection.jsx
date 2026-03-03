import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const photos = [
  { src: "/images/gallery-1.jpg", caption: "Khoảnh khắc ngọt ngào" },
  { src: "/images/gallery-2.jpg", caption: "Chỉ có anh và em" },
  { src: "/images/gallery-3.jpg", caption: "Bên nhau trên mọi nẻo đường" },
  { src: "/images/gallery-4.jpg", caption: "Hạnh phúc thật giản dị" },
  { src: "/images/gallery-5.jpg", caption: "Ngày đẹp nhất cuộc đời" },
  { src: "/images/gallery-6.jpg", caption: "Lưu giữ từng khoảnh khắc" },
  { src: "/images/gallery-7.jpg", caption: "Tình yêu mãi xanh" },
  { src: "/images/gallery-8.jpg", caption: "Cùng nhau mãi mãi" },
];

const TOTAL = photos.length;
const INTERVAL = 3000; // ms mỗi slide

function getOffset(index, active) {
  let off = index - active;
  if (off > TOTAL / 2) off -= TOTAL;
  if (off < -TOTAL / 2) off += TOTAL;
  return off;
}

function slideStyle(off) {
  const abs = Math.abs(off);
  if (abs > 2)
    return {
      opacity: 0,
      scale: 0.4,
      x: `${off * 95}%`,
      zIndex: 0,
      pointerEvents: "none",
    };
  if (abs === 2)
    return {
      opacity: 0.3,
      scale: 0.55,
      x: `${off * 78}%`,
      zIndex: 2,
      pointerEvents: "none",
    };
  if (abs === 1)
    return {
      opacity: 0.6,
      scale: 0.72,
      x: `${off * 65}%`,
      zIndex: 5,
      pointerEvents: "auto",
    };
  return {
    opacity: 1,
    scale: 1.22,
    x: "0%",
    zIndex: 10,
    pointerEvents: "auto",
  };
}

const SLIDE_TRANSITION = {
  type: "tween",
  duration: 0.9,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function GallerySection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100

  // Refs để tránh stale closure trong rAF loop
  const pausedRef = useRef(false);
  const progressRef = useRef(0); // elapsed ms
  const lastTimeRef = useRef(null); // timestamp of last rAF call
  const rafRef = useRef(null);
  const dragStartRef = useRef(null);

  // Đồng bộ state → ref
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // ---------- core rAF loop ----------
  const tick = useCallback((timestamp) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;

    if (!pausedRef.current) {
      const delta = timestamp - lastTimeRef.current;
      progressRef.current += delta;

      // Cập nhật thanh progress (0–100) mỗi frame
      setProgress(Math.min((progressRef.current / INTERVAL) * 100, 100));

      if (progressRef.current >= INTERVAL) {
        progressRef.current -= INTERVAL; // giữ phần dư, không reset về 0 → không nhảy
        setActive((a) => (a + 1) % TOTAL);
      }
    }

    lastTimeRef.current = timestamp;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Khởi động / dọn dẹp loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // ---------- Page Visibility API ----------
  // Khi tab bị ẩn: dừng tính thời gian; khi quay lại: reset lastTime để không bị nhảy
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        pausedRef.current = true;
      } else {
        lastTimeRef.current = null; // reset timestamp, tránh delta khổng lồ
        if (!paused) pausedRef.current = false;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [paused]);

  // ---------- helpers ----------
  const resetProgress = () => {
    progressRef.current = 0;
    lastTimeRef.current = null;
    setProgress(0);
  };

  const prev = useCallback(() => {
    resetProgress();
    setActive((a) => (a - 1 + TOTAL) % TOTAL);
  }, []);

  const next = useCallback(() => {
    resetProgress();
    setActive((a) => (a + 1) % TOTAL);
  }, []);

  const goTo = useCallback((i) => {
    resetProgress();
    setActive(i);
  }, []);

  // ---------- swipe ----------
  const onTouchStart = (e) => {
    dragStartRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (dragStartRef.current === null) return;
    const diff = dragStartRef.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
    dragStartRef.current = null;
  };

  // ---------- hover pause ----------
  const handleMouseEnter = () => {
    setPaused(true);
    pausedRef.current = true;
  };
  const handleMouseLeave = () => {
    lastTimeRef.current = null; // tránh delta lớn sau khi hover lâu
    setPaused(false);
    pausedRef.current = false;
  };

  return (
    <section
      id='gallery'
      className='py-24 md:py-32 overflow-hidden'
      style={{ backgroundColor: "#0E060B", touchAction: "pan-y" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className='text-center mb-14 md:mb-20 lg:mb-24 px-6'
      >
        <p className='text-xs md:text-sm tracking-[0.45em] uppercase text-gold/60 mb-3'>
          Bộ ảnh cưới
        </p>
        <h2
          className='text-3xl md:text-5xl lg:text-6xl font-light italic text-white/90'
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Khoảnh khắc của chúng mình
        </h2>
        <div className='mx-auto mt-4 h-px w-12 bg-gold/40' />
      </motion.div>

      {/* Carousel */}
      <div
        className='relative flex items-center justify-center'
        style={{ height: "clamp(340px, 58vh, 640px)" }}
      >
        {photos.map((photo, i) => {
          const off = getOffset(i, active);
          const style = slideStyle(off);

          if (Math.abs(off) > 2) return null;

          return (
            <motion.div
              key={photo.src}
              className='absolute cursor-pointer select-none'
              style={{
                width: "clamp(200px, 30vw, 420px)",
                height: "100%",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
              initial={false}
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={SLIDE_TRANSITION}
              onClick={() => off !== 0 && goTo(i)}
            >
              <div className='relative w-full h-full overflow-hidden shadow-2xl rounded-lg'>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={off === 0 ? "eager" : "lazy"}
                  decoding='async'
                  className='w-full h-full object-cover object-center'
                  style={{
                    filter: off === 0 ? "brightness(1)" : "brightness(0.65)",
                    transition: "filter 0.6s ease-out",
                  }}
                  draggable={false}
                />

                <div className='absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent pointer-events-none' />

                <AnimatePresence mode='wait'>
                  {off === 0 && (
                    <motion.div
                      key='caption'
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className='absolute bottom-6 left-4 right-4 text-center'
                    >
                      <p
                        className='text-white text-lg md:text-2xl font-light italic drop-shadow'
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {photo.caption}
                      </p>
                      <div className='mx-auto mt-2 h-px w-10 bg-gold/70' />
                    </motion.div>
                  )}
                </AnimatePresence>

                {off === 0 && (
                  <div
                    className='absolute inset-0 border-2 border-gold/40 rounded-lg pointer-events-none'
                    style={{ boxSizing: "border-box" }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators + progress bar */}
      <div className='flex items-center justify-center gap-3 mt-10'>
        {photos.map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className='relative flex items-center justify-center'
              style={{ width: 28, height: 16 }}
            >
              {/* Track */}
              <span
                className='block rounded-full bg-white/20'
                style={{
                  width: isActive ? 28 : 6,
                  height: 6,
                  transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              />
              {/* Progress fill — chỉ trên dot active */}
              {isActive && (
                <span
                  className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gold'
                  style={{
                    height: 6,
                    width: `${progress}%`,
                    maxWidth: "100%",
                    // CSS transition ngắn hơn 1 frame (~16ms) để progress mượt
                    transition: paused ? "none" : "width 80ms linear",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
