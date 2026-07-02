import { useEffect } from 'react'
import type { Venue } from '../types/wedding'
import { getDirectionsUrl } from '../lib/calendar'
import './LocationModal.css'

interface Props {
  venue: Venue
  title: string
  openInMaps: string
  noCoordinates: string
  onClose: () => void
}

export default function LocationModal({
  venue,
  title,
  openInMaps,
  noCoordinates,
  onClose,
}: Props) {
  const hasCoords = venue.latitude !== 0 || venue.longitude !== 0

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="location-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="location-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="location-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h3 className="location-modal-title">{title}</h3>
        <p className="location-modal-venue">{venue.name}</p>
        <p className="location-modal-address">{venue.address}</p>

        {hasCoords ? (
          <div className="location-modal-map">
            <iframe
              title={venue.name}
              src={`https://maps.google.com/maps?q=${venue.latitude},${venue.longitude}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="location-modal-placeholder">
            <span className="location-pin">📍</span>
            <p>{noCoordinates}</p>
          </div>
        )}

        {hasCoords && (
          <a
            href={getDirectionsUrl(venue.latitude, venue.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-filled location-modal-btn"
          >
            {openInMaps}
          </a>
        )}
      </div>
    </div>
  )
}
