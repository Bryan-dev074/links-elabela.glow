import { useState, useRef, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import PowderCanvas from './components/PowderCanvas'
import SplashScreen from './components/SplashScreen'

// ── Íconos SVG inline ────────────────────────────────────────────────────────

function StoreIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function FacebookIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function ChevronIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── WhatsApp Card (acordeón) ─────────────────────────────────────────────────

function WhatsAppCard({ label, sublabel, number, lang, index, hintEs, hintPt, defaultMsgEs, defaultMsgPt }) {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const fallbackMsgEs = '¡Hola! Vi el perfil de ElaBela y me gustaría saber más 💄'
  const fallbackMsgPt = 'Olá! Vi o perfil da ElaBela e tenho interesse em saber mais 💄'

  const defaultMsg = lang === 'pt'
    ? (defaultMsgPt || fallbackMsgPt)
    : (defaultMsgEs || fallbackMsgEs)

  const sendUrl = `https://wa.me/${number}?text=${encodeURIComponent(msg || defaultMsg)}`

  return (
    <div
      className="wa-card"
      style={{ animationDelay: `${(index + 4) * 0.08}s` }}
    >
      <div
        className="wa-card-header"
        onClick={() => setOpen(v => !v)}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(v => !v)}
      >
        <div className="wa-icon-box">
          <WhatsAppIcon size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="wa-card-title">{label}</div>
          <div className="wa-card-sub">{sublabel}</div>
        </div>
        <div className={`wa-chevron ${open ? 'open' : ''}`}>
          <ChevronIcon size={18} />
        </div>
      </div>

      <div className={`wa-drawer ${open ? 'open' : ''}`}>
        <div className="wa-drawer-inner">
          <p className="wa-hint">
            {lang === 'pt' ? hintPt : hintEs}
          </p>
          <textarea
            className="wa-textarea"
            rows={2}
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder={defaultMsg}
            aria-label="Mensaje para WhatsApp"
          />
          <a
            href={sendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-send-btn"
          >
            <WhatsAppIcon size={17} />
            {lang === 'pt' ? 'Enviar mensagem' : 'Enviar mensaje'}
          </a>
        </div>
      </div>
    </div>
  )
}

// ── App principal ────────────────────────────────────────────────────────────

function ElabelaApp() {
  const { t, lang, toggleLang, showSplash, goBack } = useApp()
  const [textKey, setTextKey] = useState(lang)
  const prevLang = useRef(lang)

  useEffect(() => {
    if (prevLang.current !== lang) {
      setTextKey(`${lang}-${Date.now()}`)
      prevLang.current = lang
    }
  }, [lang])

  const storeLabel = lang === 'pt' ? 'Visitar Loja Online' : 'Visitar Tienda Online'
  const storeUrl   = lang === 'pt'
    ? 'https://www.elabela.com.py/br/'
    : 'https://www.elabela.com.py/'

  const socialsLabel  = lang === 'pt' ? 'Nossas Redes' : 'Nuestras Redes'
  const contactLabel  = lang === 'pt' ? 'Fale Conosco' : 'Contáctanos'

  const wa1 = {
    label:   'Vendedora Sandra',
    sublabel: '+595 983 141 303',
    number:  '595983141303',
    hintEs:  '¿Buscas algún producto en específico? ¡Escribime! 😊',
    hintPt:  'Procurando um produto específico? Escreva para mim! 😊',
    defaultMsgEs: '¡Hola Sandra! Busco un producto específico...',
    defaultMsgPt: 'Olá Sandra! Estou procurando um produto específico...',
  }
  const wa2 = {
    label:   lang === 'pt' ? 'Assistência personalizada' : 'Asistencia personalizada',
    sublabel: '+595 981 078 868',
    number:  '595981078868',
    hintEs:  'Si tenés problemas técnicos, estamos a la orden 🛠️',
    hintPt:  'Se tiver problemas técnicos, estamos à disposição 🛠️',
    defaultMsgEs: '¡Hola! Necesito asistencia técnica...',
    defaultMsgPt: 'Olá! Preciso de assistência técnica...',
  }

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Fondo */}
      <div className="page-bg" aria-hidden="true" />
      <PowderCanvas />

      {/* Splash */}
      <SplashScreen />

      {/* Selector de idioma (top right) */}
      {!showSplash && (
        <div className="lang-selector fade-in">
          <button
            id="lang-btn-es"
            className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
            onClick={() => toggleLang('es')}
            aria-pressed={lang === 'es'}
          >
            🇵🇾 ES
          </button>
          <button
            id="lang-btn-pt"
            className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
            onClick={() => toggleLang('pt')}
            aria-pressed={lang === 'pt'}
          >
            🇧🇷 PT
          </button>
        </div>
      )}

      {/* Botón volver */}
      {!showSplash && (
        <button
          className="back-btn fade-in"
          onClick={goBack}
          aria-label="Cambiar país"
        >
          ← {lang === 'pt' ? 'Mudar país' : 'Cambiar país'}
        </button>
      )}

      {/* Main */}
      {!showSplash && (
        <main className="main-content">

          {/* Logo grande sin marco */}
          <img
            key={`logo-${textKey}`}
            src="/logoelabela/logo.png"
            alt="ElaBela Glow — Belleza Premium"
            className="hero-logo"
            width="200"
          />

          {/* Tagline con animación constante */}
          <h1 key={`tag-${textKey}`} className="tagline">
            {t.tagline}
          </h1>

          {/* Descripción */}
          <p key={`desc-${textKey}`} className="description">
            {t.description}
          </p>

          {/* ── Botón Tienda — centrado, icono grande, shimmer ── */}
          <a
            id="btn-store"
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="store-btn"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="store-icon-wrap">
              <StoreIcon size={26} />
            </div>
            <span>{storeLabel}</span>
            <span className="store-sub">elabela.com.py</span>
          </a>

          {/* ── Sección Redes Sociales ── */}
          <div className="section-divider" style={{ animationDelay: '0.35s' }}>
            <span className="section-label-text">{socialsLabel}</span>
          </div>

          <div className="socials-grid">

            {/* Instagram */}
            <a
              id="btn-instagram"
              href="https://www.instagram.com/elabela.glow/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{ animationDelay: '0.38s' }}
            >
              <div className="social-icon-circle ig">
                <InstagramIcon size={22} />
              </div>
              <span>Instagram</span>
            </a>

            {/* TikTok */}
            <a
              id="btn-tiktok"
              href="https://www.tiktok.com/@elabela.glow"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{ animationDelay: '0.43s' }}
            >
              <div className="social-icon-circle tt">
                <div className="tt-glow-r" />
                <div className="tt-glow-b" />
                <TikTokIcon size={22} />
              </div>
              <span>TikTok</span>
            </a>

            {/* Facebook */}
            <a
              id="btn-facebook"
              href="https://www.facebook.com/profile.php?id=61573675747127"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              style={{ animationDelay: '0.48s' }}
            >
              <div className="social-icon-circle fb">
                <FacebookIcon size={22} />
              </div>
              <span>Facebook</span>
            </a>
          </div>

          {/* ── Sección WhatsApp ── */}
          <div className="section-divider" style={{ animationDelay: '0.52s' }}>
            <span className="section-label-text">{contactLabel}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <WhatsAppCard
              key={`wa1-${textKey}`}
              label={wa1.label}
              sublabel={wa1.sublabel}
              number={wa1.number}
              lang={lang}
              index={0}
              hintEs={wa1.hintEs}
              hintPt={wa1.hintPt}
              defaultMsgEs={wa1.defaultMsgEs}
              defaultMsgPt={wa1.defaultMsgPt}
            />
            <WhatsAppCard
              key={`wa2-${textKey}`}
              label={wa2.label}
              sublabel={wa2.sublabel}
              number={wa2.number}
              lang={lang}
              index={1}
              hintEs={wa2.hintEs}
              hintPt={wa2.hintPt}
              defaultMsgEs={wa2.defaultMsgEs}
              defaultMsgPt={wa2.defaultMsgPt}
            />
          </div>

          {/* Footer */}
          <footer className="page-footer">
            <div className="footer-line" />
            <p className="footer-copy">© 2026 ElaBela.glow</p>
            <p className="footer-sub">Belleza Premium · Paraguay &amp; Brasil</p>
          </footer>
        </main>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <ElabelaApp />
    </AppProvider>
  )
}
