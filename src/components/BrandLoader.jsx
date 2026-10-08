import { useEffect, useRef, useState } from 'react'
import './BrandLoader.css'

const REVEAL_AT = 2600
const EXIT_DURATION = 650

export default function BrandLoader({ reduced, onReveal, onComplete }) {
  const dialog = useRef(null)
  const skip = useRef(null)
  const [logoFailed, setLogoFailed] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    dialog.current?.focus({ preventScroll: true })
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  useEffect(() => {
    // Independent of image/font/network events: a slow resource cannot trap a visitor.
    const revealTimer = setTimeout(() => {
      setExiting(true)
      onReveal()
    }, reduced ? 200 : REVEAL_AT)
    const completeTimer = setTimeout(onComplete, reduced ? 350 : REVEAL_AT + EXIT_DURATION)
    return () => {
      clearTimeout(revealTimer)
      clearTimeout(completeTimer)
    }
  }, [reduced, onReveal, onComplete])

  return (
    <div
      ref={dialog}
      className={`brand-loader${exiting ? ' is-exiting' : ''}${reduced ? ' is-reduced' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a ElaBela"
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onComplete()
        if (event.key === 'Tab') {
          event.preventDefault()
          skip.current?.focus()
        }
      }}
    >
      <div className="brand-loader__veil" aria-hidden="true" />
      <div className="brand-loader__light" aria-hidden="true" />
      <div className="brand-loader__topline" aria-hidden="true">
        <span /> E L A B E L A · G L O W
      </div>

      <div className="brand-loader__scene">
        <div className="brand-loader__orbits" aria-hidden="true">
          <div className="brand-loader__orbit brand-loader__orbit--one"><i /></div>
          <div className="brand-loader__orbit brand-loader__orbit--two"><i /></div>
          <div className="brand-loader__horizon" />
        </div>

        <div className="brand-loader__lockup">
          <div className="brand-loader__logo">
            {logoFailed ? (
              <span className="brand-loader__fallback">ElaBela</span>
            ) : (
              <img
                src="/brand/logo-cream.svg"
                alt="ElaBela Glow"
                width="220"
                height="200"
                fetchPriority="high"
                onError={() => setLogoFailed(true)}
              />
            )}
            {!logoFailed && <span className="brand-loader__shine" aria-hidden="true" />}
          </div>
          <div className="brand-loader__copy">
            <p className="brand-loader__eyebrow">Tu mundo de belleza</p>
            <p className="brand-loader__title">a un <em>toque.</em></p>
            <div className="brand-loader__destinations" aria-hidden="true">
              <span>Tienda</span><i /><span>Redes</span><i /><span>Contacto</span>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-loader__bottomline">
        <p>Paraguay <span>·</span> Brasil</p>
        <button ref={skip} type="button" className="brand-loader__skip" onClick={onComplete}>
          Entrar
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
