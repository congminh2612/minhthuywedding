import { useScroll, motion } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-150 h-[2px] origin-left"
      style={{ marginTop: 'env(safe-area-inset-top)' }}
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #C4677B, #C9A055, #C4677B)',
      }}
    />
  )
}
