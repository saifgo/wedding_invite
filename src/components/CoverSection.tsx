import { useEffect, useState } from 'react'
import type { LocalizedWeddingData } from '../types/wedding'
import PetalsLayer from './PetalsLayer'
import SealText from './SealText'
import './CoverSection.css'

interface Props {
  data: LocalizedWeddingData
}

export default function CoverSection({ data }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { families, couple, cover, language, coverAssets } = data
  const isRtl = language === 'ar'

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoaded(true), 300)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <section className="section cover-section">
      <div
        className={`invitation-envelope${isLoaded ? ' loaded' : ''}${isOpen ? ' open' : ''}`}
      >
        <div className="env-card">
          <div className="intro-section">
            <div
              className="intro-bg"
              style={
                coverAssets.background
                  ? { backgroundImage: `url(${coverAssets.background})` }
                  : undefined
              }
            />
            {isOpen && <PetalsLayer />}
            <div className="intro-overlay">
              {cover.blessing && (
                <div className="basmala">{cover.blessing}</div>
              )}
              <div className="divider-ornament">✦ ✦ ✦</div>

              {families ? (
                <>
                  <p className="invite-text">{cover.familiesIntro}</p>
                  <div className="families-row">
                    <div className="family-block">
                      <div className="family-label">{cover.mr}</div>
                      <div className="family-name">{families.hisFather}</div>
                      <div className="family-label spaced">{cover.mrs}</div>
                      <div className="family-name">{families.hisMother}</div>
                    </div>
                    <div className="and-symbol">{cover.and}</div>
                    <div className="family-block">
                      <div className="family-label">{cover.mr}</div>
                      <div className="family-name">{families.herFather}</div>
                      <div className="family-label spaced">{cover.mrs}</div>
                      <div className="family-name">{families.herMother}</div>
                    </div>
                  </div>
                  <p className="invite-text invite-text--spaced">{cover.inviteTo}</p>
                </>
              ) : (
                <>
                  <p className="invite-text">{couple.tagline}</p>
                  <p className="invite-text invite-text--spaced">{cover.inviteHeading}</p>
                </>
              )}

              <div className="names-main">
                <span className="groom-name">{couple.hisName}</span>
                <span className="names-divider">&</span>
                <span className="bride-name">{couple.herName}</span>
              </div>

              {cover.joyMessage && (
                <p className="invite-text invite-text--joy">{cover.joyMessage}</p>
              )}

              <div className="shimmer-line" />
            </div>

            <div className="scroll-hint">
              <span>{cover.scroll}</span>
              <div className="scroll-arrow" />
            </div>
          </div>
        </div>

        <img
          className="left-panel"
          src={coverAssets.leftPanel}
          alt=""
          draggable={false}
        />
        <img
          className="right-panel"
          src={coverAssets.rightPanel}
          alt=""
          draggable={false}
        />

        {!isOpen && (
          <>
            <div className="gold-circle" aria-hidden="true" />
            <span className="sparkle s1" aria-hidden="true">✦</span>
            <span className="sparkle s2" aria-hidden="true">✦</span>
            <span className="sparkle s3" aria-hidden="true">✦</span>
            <span className="sparkle s4" aria-hidden="true">✦</span>
            <SealText text={cover.tapToOpen} isRtl={isRtl} />
            <button
              type="button"
              className="seal-btn"
              onClick={() => setIsOpen(true)}
              aria-label={cover.openInvitation}
            >
              <img className="seal" src={coverAssets.seal} alt="" draggable={false} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}
