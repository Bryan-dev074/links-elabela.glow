import { createContext, useContext, useState, useEffect } from 'react'
import { translations, countryLangMap } from '../data/translations'

// ─── Context Creation ────────────────────────────────────────────────────────
const AppContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [showSplash, setShowSplash] = useState(true)
  const [splashExiting, setSplashExiting] = useState(false)
  const [country, setCountry] = useState(null)
  const [lang, setLang] = useState('es')

  // Derived translation set
  const t = translations[lang] || translations.es

  // ── Select Country (from splash) ─────────────────────────────────────────
  const selectCountry = (countryCode) => {
    const defaultLang = countryLangMap[countryCode] || 'es'
    setCountry(countryCode)
    setLang(defaultLang)

    // Animate out the splash
    setSplashExiting(true)
    setTimeout(() => {
      setShowSplash(false)
      setSplashExiting(false)
    }, 650)
  }

  // ── Toggle Language ───────────────────────────────────────────────────────
  const toggleLang = (newLang) => {
    if (newLang === lang) return
    setLang(newLang)
  }

  // ── Go Back to Country Selector ──────────────────────────────────────────
  const goBack = () => {
    setShowSplash(true)
    setCountry(null)
  }

  return (
    <AppContext.Provider
      value={{
        country,
        lang,
        t,
        showSplash,
        splashExiting,
        selectCountry,
        toggleLang,
        goBack,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
