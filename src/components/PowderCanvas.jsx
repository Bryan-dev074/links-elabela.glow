import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60
const COLORS = [
  'rgba(255, 255, 255, VAL)',   // white
  'rgba(248, 236, 231, VAL)',   // light peach
  'rgba(232, 203, 189, VAL)',   // soft blush
  'rgba(241, 215, 204, VAL)',   // cream
  'rgba(86, 52, 46, VAL)',      // subtle brown (very low alpha)
]

function makeColor(idx, alpha) {
  // If it's the brown color, reduce alpha significantly so it doesn't look like dirt
  let a = idx === 4 ? alpha * 0.15 : alpha
  return COLORS[idx % COLORS.length].replace('VAL', a.toFixed(3))
}

function randBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function PowderCanvas() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ mx: 0.5, my: 0.5, scroll: 0, particles: [] })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    let W = 0, H = 0
    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      state.particles.forEach(p => {
        if (p.x > W) p.x = Math.random() * W
        if (p.y > H) p.y = Math.random() * H
      })
    }

    function init() {
      resize()
      state.particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x:      Math.random() * W,
        y:      Math.random() * H,
        r:      randBetween(1.5, 4.5),
        vx:     randBetween(-0.15, 0.15),
        vy:     randBetween(-0.2, 0.05),
        alpha:  randBetween(0.1, 0.6),
        alphaDir: Math.random() < 0.5 ? 1 : -1,
        colorIdx: i % COLORS.length,
        depth:  randBetween(0.2, 1),
        phase:  Math.random() * Math.PI * 2,
        freq:   randBetween(0.01, 0.025),
      }))
    }

    let targetMx = 0.5, targetMy = 0.5
    let curMx = 0.5, curMy = 0.5

    function onMouseMove(e) {
      targetMx = e.clientX / W
      targetMy = e.clientY / H
    }
    function onTouchMove(e) {
      if (e.touches.length) {
        targetMx = e.touches[0].clientX / W
        targetMy = e.touches[0].clientY / H
      }
    }
    function onScroll() {
      state.scroll = window.scrollY
    }

    let raf, frame = 0

    function draw() {
      raf = requestAnimationFrame(draw)
      frame++

      curMx += (targetMx - curMx) * 0.05
      curMy += (targetMy - curMy) * 0.05

      const forceX = (curMx - 0.5) * 0.8
      const forceY = (curMy - 0.5) * 0.6
      const scrollForce = (state.scroll * 0.001) % 1

      ctx.clearRect(0, 0, W, H)

      state.particles.forEach(p => {
        p.phase += p.freq
        const osc = Math.sin(p.phase) * 0.4

        p.x += (p.vx + forceX * p.depth + osc) * 0.9
        p.y += (p.vy - forceY * p.depth + scrollForce * p.depth * 0.6) * 0.9

        const margin = 40
        if (p.x < -margin) p.x = W + margin
        if (p.x > W + margin) p.x = -margin
        if (p.y < -margin) p.y = H + margin
        if (p.y > H + margin) p.y = -margin

        p.alpha += p.alphaDir * 0.003
        if (p.alpha > 0.6 || p.alpha < 0.1) p.alphaDir *= -1

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2)
        grad.addColorStop(0, makeColor(p.colorIdx, p.alpha))
        grad.addColorStop(0.5, makeColor(p.colorIdx, p.alpha * 0.5))
        grad.addColorStop(1, makeColor(p.colorIdx, 0))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        if (frame % 60 === 0 && Math.random() < 0.05 && p.colorIdx !== 4) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = makeColor(p.colorIdx, 0.9)
          ctx.fill()
        }
      })
    }

    init()
    draw()

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="powder-canvas"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
