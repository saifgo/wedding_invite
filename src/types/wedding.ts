export type Language = 'en' | 'ar' | 'fr'

export interface Venue {
  name: string
  address: string
  latitude: number
  longitude: number
}

export interface TimelineEvent {
  time: string
  title: string
  description: string
}

export interface WeddingDay {
  label: string
  title: string
  date: string
  venue: Venue
  events: TimelineEvent[]
}

export interface CoverAssets {
  leftPanel: string
  rightPanel: string
  seal: string
  background: string
}

export interface Families {
  hisFather: string
  hisMother: string
  herFather: string
  herMother: string
}

export interface RSVPFormLabels {
  fullName: string
  namePlaceholder: string
  attending: string
  accept: string
  decline: string
  guestCount: string
  message: string
  messagePlaceholder: string
  submit: string
  sending: string
  successTitle: string
  successMessage: string
  submitAnother: string
  error: string
}

export interface LanguageCouple {
  hisName: string
  herName: string
  tagline: string
}

export interface LanguageContent {
  couple: LanguageCouple
  families?: Families
  cover: {
    monogram: string
    subtitle: string
    tapToOpen: string
    openInvitation: string
    inviteHeading: string
    weddingCelebration: string
    scroll: string
    blessing?: string
    familiesIntro?: string
    mr?: string
    mrs?: string
    and?: string
    inviteTo?: string
    joyMessage?: string
  }
  countdown: {
    sectionLabel: string
    sectionTitle: string
    days: string
    hours: string
    minutes: string
    seconds: string
    scroll: string
  }
  timeline: {
    sectionLabel: string
    sectionTitle: string
    getDirections: string
    addToCalendar: string
    location: string
    scroll: string
  }
  location: {
    title: string
    openInMaps: string
    noCoordinates: string
  }
  days: WeddingDay[]
  ourStory: {
    sectionLabel: string
    title: string
    paragraph: string
    imageAlts: string[]
  }
  rsvp: {
    sectionLabel: string
    title: string
    subtitle: string
    respondBy: string
    deadline: string
    form: RSVPFormLabels
  }
  contact: {
    sectionLabel: string
    title: string
    message: string
    emailLabel: string
    phoneLabel: string
    instagramLabel: string
    installApp: {
      sectionLabel: string
      title: string
      description: string
      installButton: string
      iosStep1: string
      iosStep2: string
      iosStep3: string
      androidStep1: string
      androidStep2: string
      androidStep3: string
      installedMessage: string
    }
  }
  common: {
    loadingError: string
  }
}

export interface WeddingDataRoot {
  defaultLanguage: Language
  couple: {
    weddingDate: string
  }
  cover: {
    assets: CoverAssets
  }
  story: {
    images: { src: string }[]
  }
  contact: {
    email: string
    phone: string
    instagram: string
  }
  languages: Record<Language, LanguageContent>
}

export interface LocalizedWeddingData {
  language: Language
  couple: LanguageCouple & { weddingDate: string }
  cover: LanguageContent['cover']
  coverAssets: CoverAssets
  families?: Families
  countdown: LanguageContent['countdown']
  timeline: LanguageContent['timeline']
  location: LanguageContent['location']
  days: WeddingDay[]
  ourStory: LanguageContent['ourStory'] & {
    images: { src: string; alt: string }[]
  }
  rsvp: LanguageContent['rsvp']
  contact: LanguageContent['contact'] & WeddingDataRoot['contact']
  common: LanguageContent['common']
}

export interface RSVPFormData {
  name: string
  attending: 'yes' | 'no'
  guestCount: number
  message: string
  language: Language
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  ar: 'عربي',
  fr: 'FR',
}

export const LANGUAGE_LOCALES: Record<Language, string> = {
  en: 'en-US',
  ar: 'ar-TN',
  fr: 'fr-FR',
}
