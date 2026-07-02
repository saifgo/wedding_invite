import { useState } from 'react'
import { useLocale } from '../context/LanguageContext'
import type { LocalizedWeddingData } from '../types/wedding'
import {
  getGoogleCalendarUrl,
  getDirectionsUrl,
  formatDisplayDate,
} from '../lib/calendar'
import './TimelineSection.css'

interface Props {
  data: LocalizedWeddingData
}

export default function TimelineSection({ data }: Props) {
  const [activeDay, setActiveDay] = useState(0)
  const locale = useLocale()
  const day = data.days[activeDay]

  return (
    <section className="section timeline-section">
      <div className="timeline-container">
        <p className="section-label">{data.timeline.sectionLabel}</p>
        <h2 className="section-title">{data.timeline.sectionTitle}</h2>

        <div className="day-tabs">
          {data.days.map((d, i) => (
            <button
              key={d.label}
              className={`day-tab ${i === activeDay ? 'active' : ''}`}
              onClick={() => setActiveDay(i)}
            >
              <span className="day-tab-label">{d.label}</span>
              <span className="day-tab-title">{d.title}</span>
            </button>
          ))}
        </div>

        <div className="day-content" key={activeDay}>
          <p className="day-date">{formatDisplayDate(day.date, locale)}</p>
          <p className="day-venue">{day.venue.name}</p>
          <p className="day-address">{day.venue.address}</p>

          <div className="timeline">
            {day.events.map((event, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  {i < day.events.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-body">
                  <span className="timeline-time">{event.time}</span>
                  <h3 className="timeline-event-title">{event.title}</h3>
                  <p className="timeline-event-desc">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="day-actions">
            <a
              href={getDirectionsUrl(day.venue.latitude, day.venue.longitude)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {data.timeline.getDirections}
            </a>
            <a
              href={getGoogleCalendarUrl(day)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-filled"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {data.timeline.addToCalendar}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
