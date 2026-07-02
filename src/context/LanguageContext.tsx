import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Language, LocalizedWeddingData, WeddingDataRoot } from '../types/wedding'
import { LANGUAGE_LOCALES } from '../types/wedding'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  content: LocalizedWeddingData | null
  availableLanguages: Language[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'wedding-invite-language'

function buildLocalizedData(
  root: WeddingDataRoot,
  language: Language
): LocalizedWeddingData {
  const lang = root.languages[language] ?? root.languages[root.defaultLanguage]

  return {
    language,
    couple: {
      ...lang.couple,
      weddingDate: root.couple.weddingDate,
    },
    cover: lang.cover,
    coverAssets: root.cover.assets,
    families: lang.families,
    countdown: lang.countdown,
    timeline: lang.timeline,
    location: lang.location,
    days: lang.days,
    ourStory: {
      ...lang.ourStory,
      images: root.story.images.map((img, i) => ({
        src: img.src,
        alt: lang.ourStory.imageAlts[i] ?? '',
      })),
    },
    rsvp: lang.rsvp,
    contact: { ...root.contact, ...lang.contact },
    common: lang.common,
  }
}

function detectInitialLanguage(root: WeddingDataRoot): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null
  if (stored && root.languages[stored]) return stored

  const browserLang = navigator.language.slice(0, 2) as Language
  if (root.languages[browserLang]) return browserLang

  return root.defaultLanguage
}

interface ProviderProps {
  data: WeddingDataRoot
  children: ReactNode
}

export function LanguageProvider({ data, children }: ProviderProps) {
  const availableLanguages = useMemo(
    () => Object.keys(data.languages) as Language[],
    [data.languages]
  )

  const [language, setLanguageState] = useState<Language>(() =>
    detectInitialLanguage(data)
  )

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }, [])

  const content = useMemo(
    () => buildLocalizedData(data, language),
    [data, language]
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  useEffect(() => {
    const { hisName, herName } = content.couple
    document.title =
      language === 'ar'
        ? `دعوة زفاف ${hisName} و ${herName}`
        : language === 'fr'
          ? `Mariage de ${hisName} & ${herName}`
          : `${hisName} & ${herName} — Wedding Invitation`
  }, [language, content.couple])

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, content, availableLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useLocale() {
  const { language } = useLanguage()
  return LANGUAGE_LOCALES[language]
}
