import { useWeddingData } from './hooks/useWeddingData'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'
import SparkleLayer from './components/SparkleLayer'
import CoverSection from './components/CoverSection'
import CountdownSection from './components/CountdownSection'
import TimelineSection from './components/TimelineSection'
import OurStorySection from './components/OurStorySection'
import RSVPSection from './components/RSVPSection'
import ContactSection from './components/ContactSection'
import type { WeddingDataRoot } from './types/wedding'
import './App.css'

function InvitationContent() {
  const { content } = useLanguage()
  if (!content) return null

  return (
    <>
      <SparkleLayer />
      <LanguageSwitcher />
      <main className="invitation">
        <CoverSection data={content} />
        <CountdownSection data={content} />
        <TimelineSection data={content} />
        <OurStorySection data={content} />
        <RSVPSection data={content} />
        <ContactSection data={content} />
      </main>
    </>
  )
}

function AppWithLanguage({ data }: { data: WeddingDataRoot }) {
  return (
    <LanguageProvider data={data}>
      <InvitationContent />
    </LanguageProvider>
  )
}

function App() {
  const { data, loading, error } = useWeddingData()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-monogram">♥</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="loading-screen">
        <p>Unable to load invitation. Please try again later.</p>
      </div>
    )
  }

  return <AppWithLanguage data={data} />
}

export default App
