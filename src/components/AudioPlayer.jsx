import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const AUDIO_SRC = '/audio/Con Đường Hạnh Phúc (Ballad).mp3'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing,  setPlaying]  = useState(false)
  const [showTip,  setShowTip]  = useState(false)

  // Tự phát khi người dùng tương tác lần đầu
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }

    const events = ['click', 'touchstart', 'scroll', 'keydown']
    events.forEach((ev) => window.addEventListener(ev, tryPlay, { once: true }))

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, tryPlay))
    }
  }, [])

  // Hiện tooltip sau 3 giây nếu chưa phát
  useEffect(() => {
    const t = setTimeout(() => {
      if (!playing) setShowTip(true)
    }, 3000)
    return () => clearTimeout(t)
  }, [playing])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
    setShowTip(false)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
      />

      <div
        className="fixed right-4 z-[100] flex flex-col items-end gap-2"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <AnimatePresence>
          {showTip && !playing && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/90 backdrop-blur-sm border border-blush/40 shadow-md px-4 py-2 text-xs text-charcoal/70 rounded-sm whitespace-nowrap italic"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Bật nhạc nền 🎵
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          title={playing ? 'Tắt nhạc' : 'Bật nhạc'}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border border-white/30"
          style={{
            background: 'rgba(196,103,123,0.80)',
            boxShadow: '0 4px 24px rgba(196,103,123,0.4)',
          }}
        >
          {playing ? (
            <span className="flex items-end gap-[3px] h-5">
              {[0.7, 1, 0.5, 0.9, 0.6].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-white"
                  animate={{ scaleY: [h, 1, h * 0.3, 0.85, h] }}
                  transition={{
                    duration: 0.7 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.1,
                  }}
                  style={{ height: '100%', transformOrigin: 'bottom' }}
                />
              ))}
            </span>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      </div>
    </>
  )
}
