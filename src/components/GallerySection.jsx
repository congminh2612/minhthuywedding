import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const photos = [
  { src: "/images/gallery-1.jpg", caption: "Khoảnh khắc ngọt ngào" },
  { src: "/images/gallery-2.jpg", caption: "Chỉ có anh và em" },
  { src: "/images/gallery-3.jpg", caption: "Bên nhau trên mọi nẻo đường" },
  { src: "/images/gallery-4.jpg", caption: "Hạnh phúc thật giản dị" },
  { src: "/images/gallery-5.jpg", caption: "Ngày đẹp nhất cuộc đời" },
  { src: "/images/gallery-6.jpg", caption: "Lưu giữ từng khoảnh khắc" },
  { src: "/images/gallery-7.jpg", caption: "Tình yêu mãi xanh" },
  { src: "/images/gallery-8.jpg", caption: "Cùng nhau mãi mãi" },
  { src: "/images/gallery-9.png", caption: "Cùng nhau mãi mãi" },
  { src: "/images/gallery-10.png", caption: "Cùng nhau mãi mãi" },
];

const TOTAL = photos.length;
const INTERVAL = 3000;

function getOffset(index, active) {
  let off = index - active;
  if (off > TOTAL / 2) off -= TOTAL;
  if (off < -TOTAL / 2) off += TOTAL;
  return off;
}

// Precomputed — zero allocations inside render
const SLIDE_STYLES = {
  "-2": { opacity: 0.3, scale: 0.55, x: "-156%", zIndex: 2 },
  "-1": { opacity: 0.6, scale: 0.72, x: "-65%", zIndex: 5 },
  0: { opacity: 1, scale: 1.22, x: "0%", zIndex: 10 },
  1: { opacity: 0.6, scale: 0.72, x: "65%", zIndex: 5 },
  2: { opacity: 0.3, scale: 0.55, x: "156%", zIndex: 2 },
};
function slideStyle(off) {
  return (
    SLIDE_STYLES[String(off)] ?? {
      opacity: 0,
      scale: 0.4,
      x: `${off * 95}%`,
      zIndex: 0,
    }
  );
}

const EASE = [0.25, 0.46, 0.45, 0.94];
const SLIDE_TRANSITION = { type: "tween", duration: 0.9, ease: EASE };
const INSTANT = { duration: 0 };

export default function GallerySection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const pausedRef = useRef(false);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);
  const dragStartRef = useRef(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // ── rAF timer loop ────────────────────────────────────────────────────────
  const tickRef = useRef(null);
  // eslint-disable-next-line react-hooks/refs
  tickRef.current = (timestamp) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;

    if (!pausedRef.current) {
      // Cap delta to 200 ms — prevents large jump after tab switch / scroll
      const delta = Math.min(timestamp - lastTimeRef.current, 200);
      progressRef.current += delta;

      if (progressRef.current >= INTERVAL) {
        progressRef.current -= INTERVAL;
        setActive((a) => (a + 1) % TOTAL);
      }
    }

    lastTimeRef.current = timestamp;
    rafRef.current = requestAnimationFrame((ts) => tickRef.current(ts));
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame((ts) => tickRef.current(ts));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Page Visibility ───────────────────────────────────────────────────────
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        pausedRef.current = true;
      } else {
        lastTimeRef.current = null; // reset so delta doesn't spike
        if (!paused) pausedRef.current = false;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [paused]);

  // ── helpers ───────────────────────────────────────────────────────────────
  const resetProgress = () => {
    progressRef.current = 0;
    lastTimeRef.current = null;
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

  // ── Touch / swipe ─────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    dragStartRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (dragStartRef.current === null) return;
      const diff = dragStartRef.current - e.changedTouches[0].clientX;
      if (diff > 40) next();
      else if (diff < -40) prev();
      dragStartRef.current = null;
    },
    [next, prev],
  );

  const handleMouseEnter = useCallback(() => {
    setPaused(true);
    pausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    lastTimeRef.current = null;
    setPaused(false);
    pausedRef.current = false;
  }, []);

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
      {/* ── Header ── */}
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

      {/* ── Carousel ── */}
      <div
        className='relative flex items-center justify-center'
        style={{ height: "clamp(340px, 58vh, 640px)" }}
      >
        {photos.map((photo, i) => {
          const off = getOffset(i, active);
          if (Math.abs(off) > 2) return null;

          const style = slideStyle(off);
          const isActive = off === 0;

          return (
            <motion.div
              key={photo.src}
              className='absolute select-none'
              style={{
                width: "clamp(250px, 30vw, 420px)",
                height: "auto",
                cursor: isActive ? "default" : "pointer",
                // Promote each card to its own GPU layer so Compositor
                // handles transform/opacity without touching the main thread
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              initial={false}
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={prefersReducedMotion ? INSTANT : SLIDE_TRANSITION}
              onClick={() => !isActive && goTo(i)}
            >
              {/*
               * translateZ(0) on the card creates a stacking context and
               * ensures border-radius clipping doesn't force a repaint
               * during the parent's scale animation on Safari/iOS.
               */}
              <div
                className='relative w-full h-full overflow-hidden shadow-2xl rounded-lg'
                style={{
                  transform: "translateZ(0)",
                  WebkitTransform: "translateZ(0)",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading={Math.abs(off) <= 1 ? "eager" : "lazy"}
                  decoding='async'
                  className='w-full h-full object-cover object-center block'
                  style={{
                    // filter is GPU-composited on modern browsers — safe to animate
                    filter: isActive ? "brightness(1)" : "brightness(0.65)",
                    transition: "filter 0.6s ease-out",
                    // Isolate img from layout so filter doesn't trigger repaint of parent
                    willChange: "filter",
                    pointerEvents: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    transform: "translateZ(0)",
                  }}
                  draggable={false}
                />

                {/* Gold border */}
                <div
                  className='absolute inset-0 rounded-lg pointer-events-none'
                  style={{
                    border: "2px solid",
                    borderColor: isActive
                      ? "rgba(201,160,85,0.4)"
                      : "transparent",
                    transition: "border-color 0.5s ease",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
