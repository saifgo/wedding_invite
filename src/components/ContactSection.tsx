import type { LocalizedWeddingData } from '../types/wedding'
import './ContactSection.css'

interface Props {
  data: LocalizedWeddingData
}

export default function ContactSection({ data }: Props) {
  const { contact, couple } = data

  return (
    <section className="section contact-section">
      <div className="contact-container">
        <p className="section-label">{contact.sectionLabel}</p>
        <h2 className="section-title">{contact.title}</h2>
        <p className="contact-message">{contact.message}</p>

        <div className="contact-cards">
          <a href={`mailto:${contact.email}`} className="contact-card">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="contact-card-label">{contact.emailLabel}</span>
            <span className="contact-card-value" dir="ltr">{contact.email}</span>
          </a>

          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-card">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="contact-card-label">{contact.phoneLabel}</span>
            <span className="contact-card-value" dir="ltr">{contact.phone}</span>
          </a>

          <a
            href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="contact-card-label">{contact.instagramLabel}</span>
            <span className="contact-card-value" dir="ltr">{contact.instagram}</span>
          </a>
        </div>

        <p className="contact-footer">
          {couple.hisName} & {couple.herName}
        </p>
      </div>
    </section>
  )
}
