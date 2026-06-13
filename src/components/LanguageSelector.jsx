import { useApp } from '../context/AppContext'
import { FlagPY, FlagBR } from './Icons'

export default function LanguageSelector() {
  const { lang, toggleLang } = useApp()

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
      role="group"
      aria-label="Selector de idioma"
    >
      <button
        id="lang-btn-es"
        className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
        onClick={() => toggleLang('es')}
        aria-pressed={lang === 'es'}
        aria-label="Cambiar a Español"
      >
        <FlagPY size={15} />
        <span>ES</span>
      </button>

      <button
        id="lang-btn-pt"
        className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
        onClick={() => toggleLang('pt')}
        aria-pressed={lang === 'pt'}
        aria-label="Mudar para Português"
      >
        <FlagBR size={15} />
        <span>PT</span>
      </button>
    </div>
  )
}
