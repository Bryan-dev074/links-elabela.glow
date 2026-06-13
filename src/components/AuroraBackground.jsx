import { useEffect, useRef } from 'react'

// ─── Animated Aurora Background with mouse/touch reactivity ─────────────────
export default function AuroraBackground() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    let rafId = null
    let targetX = 0.5
    let targetY = 0.5
    let currentX = 0.5
    let currentY = 0.5

    const lerp = (a, b, t) => a + (b - a) * t

    const handleMouseMove = (e) => {
      targetX = e.clientX / window.innerWidth
      targetY = e.clientY / window.innerHeight
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX / window.innerWidth
        targetY = e.touches[0].clientY / window.innerHeight
      }
    }

    const handleScroll = () => {
      const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)
      targetY = 0.3 + scrollFraction * 0.5
    }

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.04)
      currentY = lerp(currentY, targetY, 0.04)

      const offsetX = (currentX - 0.5) * 60
      const offsetY = (currentY - 0.5) * 60
      const intensity = 0.7 + (Math.abs(currentX - 0.5) + Math.abs(currentY - 0.5)) * 0.6

      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${-offsetX * 0.6}px, ${-offsetY * 0.5}px) scale(${intensity})`
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${offsetX * 0.8}px, ${offsetY * 0.6}px) scale(${intensity * 0.9})`
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${-offsetX * 0.4}px, ${offsetY * 0.7}px) scale(${intensity * 0.8})`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Deep background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #2a1510 0%, #1a0e0c 50%, #0d0706 100%)',
        }}
      />

      {/* Aurora Orb 1 — primary warm */}
      <div
        ref={orb1Ref}
        className="aurora-orb animate-aurora-1"
        style={{
          width: '70vw',
          height: '70vw',
          maxWidth: '700px',
          maxHeight: '700px',
          top: '-15%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(193,132,104,0.45) 0%, rgba(114,69,64,0.25) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Aurora Orb 2 — nude glow */}
      <div
        ref={orb2Ref}
        className="aurora-orb animate-aurora-2"
        style={{
          width: '65vw',
          height: '65vw',
          maxWidth: '650px',
          maxHeight: '650px',
          bottom: '-20%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(214,171,153,0.35) 0%, rgba(193,132,104,0.18) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Aurora Orb 3 — subtle deep chocolate */}
      <div
        ref={orb3Ref}
        className="aurora-orb animate-aurora-3"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: '500px',
          maxHeight: '500px',
          top: '40%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(139,99,87,0.28) 0%, rgba(114,69,64,0.12) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Fine grain noise overlay for texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />
    </div>
  )
}
