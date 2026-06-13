import { useApp } from '../context/AppContext'

export default function SplashScreen() {
  const { t, showSplash, splashExiting, selectCountry } = useApp()

  if (!showSplash) return null

  return (
    <div className={`splash-screen ${splashExiting ? 'exiting' : ''}`}
      role="dialog" aria-modal="true" aria-labelledby="splash-title">

      {/* Partículas de fondo también en splash */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #fbf0eb 0%, #f5e3db 40%, #e4ccbf 100%)',
        pointerEvents: 'none',
      }} />

      <div className="splash-card" style={{ position: 'relative', zIndex: 1 }}>

        {/* Logo grande */}
        <img
          src="/logoelabela/logo.png"
          alt="ElaBela Glow"
          className="splash-logo"
          width="140"
        />

        {/* Divisor */}
        <div style={{
          width: 60, height: 1,
          background: 'linear-gradient(to right, transparent, rgba(86,52,46,0.2), transparent)',
          marginTop: -6,
        }} />

        {/* Título */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}>
          <h2 id="splash-title" className="splash-title" style={{ lineHeight: 1.3, marginBottom: 0 }}>
            ¿Desde dónde nos visitas?<br />
            De onde você nos visita?
          </h2>
          <p className="splash-subtitle" style={{ lineHeight: 1.4 }}>
            Selecciona tu país para continuar<br />
            Selecione seu país para continuar
          </p>
        </div>

        {/* Botones de país */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>

          <button
            id="btn-country-py"
            className="country-btn"
            onClick={() => selectCountry('py')}
            aria-label="Seleccionar Paraguay"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="https://flagcdn.com/w40/py.png" alt="Bandera Paraguay" width="24" style={{ borderRadius: 2, display: 'inline-block' }} />
              <span className="country-name">{t.countryPY}</span>
            </div>
            <span className="country-lang">Español</span>
          </button>

          <button
            id="btn-country-br"
            className="country-btn"
            onClick={() => selectCountry('br')}
            aria-label="Seleccionar Brasil"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="https://flagcdn.com/w40/br.png" alt="Bandeira Brasil" width="24" style={{ borderRadius: 2, display: 'inline-block' }} />
              <span className="country-name">{t.countryBR}</span>
            </div>
            <span className="country-lang">Português</span>
          </button>

        </div>

        {/* Frase decorativa */}
        <p style={{
          fontSize: '0.6rem',
          fontWeight: 300,
          color: 'rgba(86,52,46,0.4)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: -4,
        }}>
          Beauty Premium · Exclusivo
        </p>
      </div>
    </div>
  )
}
