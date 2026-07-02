import { useLanguage } from '../context/LanguageContext'
import { LANGUAGE_LABELS } from '../types/wedding'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages } = useLanguage()

  return (
    <nav className="language-switcher" aria-label="Language selection">
      {availableLanguages.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`lang-btn ${language === lang ? 'active' : ''}`}
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          aria-label={LANGUAGE_LABELS[lang]}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </nav>
  )
}
