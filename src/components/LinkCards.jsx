import { useState } from 'react'
import {
  StoreIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  ChevronDownIcon,
  FacebookIcon,
} from './Icons'

function Icon({ name, size = 20 }) {
  switch (name) {
    case 'store':     return <StoreIcon size={size} />
    case 'instagram': return <InstagramIcon size={size} />
    case 'tiktok':    return <TikTokIcon size={size} />
    case 'whatsapp':  return <WhatsAppIcon size={size} />
    case 'facebook':  return <FacebookIcon size={size} />
    default:          return null
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// DRAWER CONTENT per link type
// ══════════════════════════════════════════════════════════════════════════════

function WebsiteDrawer({ link }) {
  return (
    <div className="drawer-inner">
      <div className="preview-content" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--color-text-main)' }}>
          <StoreIcon size={15} />
          <span style={{ fontSize: '0.85rem' }}>elabela.com.py</span>
        </div>
        <p style={{ lineHeight: 1.55, opacity: 0.85, fontSize: '0.82rem' }}>
          Explora nuestra tienda oficial. Colecciones premium, lanzamientos exclusivos y las mejores marcas internacionales de belleza.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Tarte', 'Elaluz', 'Skincare', 'Makeup'].map(tag => (
            <span key={tag} className="brand-tag">{tag}</span>
          ))}
        </div>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="drawer-cta drawer-cta-primary"
      >
        <StoreIcon size={17} />
        Visitar tienda online
      </a>
    </div>
  )
}

function InstagramDrawer({ link }) {
  return (
    <div className="drawer-inner">
      <div className="preview-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            boxShadow: '0 4px 12px rgba(220,39,67,0.3)',
          }}>
            <InstagramIcon size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>ElaBela Glow</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.65 }}>@elabela.glow</div>
          </div>
        </div>
        <p style={{ marginBottom: 12, lineHeight: 1.55, fontSize: '0.82rem', opacity: 0.85 }}>
          Tu destino de belleza premium ✨ Novedades, tutoriales y lo mejor en cosmética internacional.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ aspectRatio: '1', backgroundColor: 'rgba(107,61,54,0.06)', borderRadius: 8 }} />
          ))}
        </div>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="drawer-cta"
        style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)', color: '#fff', boxShadow: '0 4px 16px rgba(220,39,67,0.3)' }}
      >
        <InstagramIcon size={17} />
        Ver perfil en Instagram
      </a>
    </div>
  )
}

function TikTokDrawer({ link }) {
  return (
    <div className="drawer-inner">
      <div className="preview-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%', background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            <TikTokIcon size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>ElaBela</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.65 }}>@elabela.glow</div>
          </div>
        </div>
        <p style={{ marginBottom: 12, lineHeight: 1.55, fontSize: '0.82rem', opacity: 0.85 }}>
          Unboxings, swatches y tendencias virales de belleza. ¡Seguinos! 💄
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ aspectRatio: '3/4', backgroundColor: 'rgba(107,61,54,0.06)', borderRadius: 8 }} />
          ))}
        </div>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="drawer-cta"
        style={{ background: 'linear-gradient(135deg, #010101, #2a2a2a)', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
      >
        <TikTokIcon size={17} />
        Ver en TikTok
      </a>
    </div>
  )
}

function WhatsAppDrawer({ link, lang }) {
  const [msg, setMsg] = useState('')
  const number = link.url.replace('https://wa.me/', '')

  const defaultMsg = lang === 'pt'
    ? 'Olá! Vi o perfil da ElaBela e tenho interesse em saber mais 💄'
    : '¡Hola! Vi el perfil de ElaBela y me gustaría saber más 💄'

  const sendUrl = `https://wa.me/${number}?text=${encodeURIComponent(msg || defaultMsg)}`

  return (
    <div className="drawer-inner">
      <div className="preview-content" style={{ background: 'none', border: 'none', padding: '0 4px' }}>
        <p style={{ opacity: 0.8, fontSize: '0.82rem', marginBottom: 10, lineHeight: 1.5 }}>
          {lang === 'pt'
            ? 'Escreva diretamente para nós · respondemos rápido! 🚀'
            : 'Escribinos directamente · ¡respondemos rápido! 🚀'}
        </p>
        <textarea
          className="wa-input"
          rows={3}
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder={defaultMsg}
          aria-label="Mensaje para WhatsApp"
        />
      </div>
      <a
        href={sendUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="drawer-cta drawer-cta-green"
      >
        <WhatsAppIcon size={17} />
        {lang === 'pt' ? 'Enviar mensagem' : 'Enviar mensaje'}
      </a>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SINGLE LINK CARD
// ══════════════════════════════════════════════════════════════════════════════

function LinkCard({ link, index, lang }) {
  const [open, setOpen] = useState(false)

  const isWhatsApp = link.type === 'whatsapp'
  const isFeatured = link.type === 'featured'

  const wrapperTypeClass = isFeatured
    ? 'card-featured'
    : isWhatsApp
    ? 'card-whatsapp'
    : `card-${link.id}`

  const toggle = () => setOpen(v => !v)

  function DrawerContent() {
    switch (link.icon) {
      case 'store':     return <WebsiteDrawer link={link} />
      case 'instagram': return <InstagramDrawer link={link} />
      case 'tiktok':    return <TikTokDrawer link={link} />
      case 'whatsapp':  return <WhatsAppDrawer link={link} lang={lang} />
      default:          return null
    }
  }

  return (
    <div className={`slide-in-bottom delay-${Math.min(index + 1, 6)} w-full`}>
      <div className={`link-card-wrapper ${wrapperTypeClass}`}>
        <div
          className="card-header"
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle()}
        >
          <div className="icon-box">
            <Icon name={link.icon} size={22} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="card-label">{link.label}</div>
            <div className="card-sublabel">{link.sublabel}</div>
          </div>

          <ChevronDownIcon
            size={18}
            className={`card-chevron ${open ? 'open' : ''}`}
          />
        </div>

        <div className={`card-drawer ${open ? 'open' : ''}`}>
          <DrawerContent />
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION SEPARATOR
// ══════════════════════════════════════════════════════════════════════════════

function SectionLabel({ text, delay }) {
  return (
    <div
      className={`section-label slide-in-bottom delay-${delay}`}
      style={{ margin: '8px 0 4px' }}
    >
      {text}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORTED LIST
// ══════════════════════════════════════════════════════════════════════════════
export default function LinkCards({ links, langKey }) {
  const isSocialLink = (link) => ['instagram', 'tiktok', 'facebook'].includes(link.icon)
  const isWhatsApp   = (link) => link.type === 'whatsapp'
  const isFeatured   = (link) => link.type === 'featured'

  const featured  = links.filter(isFeatured)
  const socials   = links.filter(isSocialLink)
  const whatsapps = links.filter(isWhatsApp)

  const socialsLabel   = langKey === 'pt' ? 'Nossas Redes' : 'Nuestras Redes'
  const contactLabel   = langKey === 'pt' ? 'Fale Conosco' : 'Contáctanos'

  let globalIdx = 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>

      {/* Featured (tienda) */}
      {featured.map(link => (
        <LinkCard key={`${langKey}-${link.id}`} link={link} index={globalIdx++} lang={langKey} />
      ))}

      {/* Social networks */}
      {socials.length > 0 && (
        <>
          <SectionLabel text={socialsLabel} delay={Math.min(globalIdx + 1, 6)} />
          {socials.map(link => (
            <LinkCard key={`${langKey}-${link.id}`} link={link} index={globalIdx++} lang={langKey} />
          ))}
        </>
      )}

      {/* WhatsApp */}
      {whatsapps.length > 0 && (
        <>
          <SectionLabel text={contactLabel} delay={Math.min(globalIdx + 1, 6)} />
          {whatsapps.map(link => (
            <LinkCard key={`${langKey}-${link.id}`} link={link} index={globalIdx++} lang={langKey} />
          ))}
        </>
      )}
    </div>
  )
}
