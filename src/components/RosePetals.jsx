import { useEffect, useRef } from 'react'

// RGB riêng để tránh parse string mỗi frame
const COLORS = [
  [255, 105, 130],
  [255, 160, 180],
  [255,  80, 110],
  [220,  60,  90],
  [255, 200, 210],
]

function createPetal(W, H, fromTop = false) {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    x:             Math.random() * W,
    y:             fromTop ? -20 : Math.random() * H,
    w:             Math.random() * 18 + 14,
    h:             Math.random() * 10 + 8,
    rotation:      Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.055,
    speedY:        Math.random() * 1.2 + 0.55,
    speedX:        (Math.random() - 0.5) * 0.5,
    swayFreq:      Math.random() * 0.014 + 0.007,
    swayOffset:    Math.random() * Math.PI * 2,
    alpha:         Math.random() * 0.45 + 0.45,
    tick:          Math.random() * 1000,
    r, g, b,
  }
}

// Vẽ không dùng gradient/shadow mỗi frame → nhanh hơn ~4x
function drawPetal(ctx, p) {
  const { x, y, w, h, rotation, alpha, r, g, b } = p
  const hw = w / 2
  const hh = h / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)

  // Thân cánh hoa
  ctx.beginPath()
  ctx.moveTo(0, hh)
  ctx.bezierCurveTo( hw * 1.15,  hh * 0.35,  hw,        -hh * 0.55,  hw * 0.28, -hh)
  ctx.quadraticCurveTo(0, -hh * 0.65, -hw * 0.28, -hh)
  ctx.bezierCurveTo(-hw,        -hh * 0.55, -hw * 1.15,  hh * 0.35,  0, hh)
  ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
  ctx.fill()

  // Highlight nhẹ (không dùng shadow)
  ctx.beginPath()
  ctx.ellipse(-hw * 0.15, -hh * 0.2, hw * 0.28, hh * 0.2, -0.3, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,255,255,${alpha * 0.22})`
  ctx.fill()

  ctx.restore()
}

export default function RosePetals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    let frameId
    let petals = []

    // Giảm số lượng trên mobile để tránh lag
    const COUNT = window.innerWidth < 768 ? 30 : 60

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2) // tối đa 2x
      canvas.width  = window.innerWidth  * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width  = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const init = () => {
      resize()
      petals = Array.from({ length: COUNT }, () =>
        createPetal(window.innerWidth, window.innerHeight)
      )
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const p of petals) {
        p.tick      += 1
        p.rotation  += p.rotationSpeed
        p.y         += p.speedY
        p.x         += p.speedX + Math.sin(p.tick * p.swayFreq + p.swayOffset) * 0.55

        if (p.y > window.innerHeight + 24) {
          Object.assign(p, createPetal(window.innerWidth, window.innerHeight, true))
        }

        drawPetal(ctx, p)
      }

      frameId = requestAnimationFrame(animate)
    }

    init()
    animate()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ willChange: 'transform' }}
    />
  )
}
