import { useState, type FormEvent } from 'react'
import { useLanguage, useLocale } from '../context/LanguageContext'
import type { LocalizedWeddingData, RSVPFormData } from '../types/wedding'
import { submitRSVP, isFirebaseConfigured } from '../lib/firebase'
import { formatDisplayDate } from '../lib/calendar'
import './RSVPSection.css'

interface Props {
  data: LocalizedWeddingData
}

const emptyForm = (language: RSVPFormData['language']): RSVPFormData => ({
  name: '',
  attending: 'yes',
  guestCount: 1,
  message: '',
  language,
})

export default function RSVPSection({ data }: Props) {
  const { language } = useLanguage()
  const locale = useLocale()
  const { rsvp } = data
  const { form: labels } = rsvp

  const [form, setForm] = useState<RSVPFormData>(() => emptyForm(language))
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = <K extends keyof RSVPFormData>(key: K, value: RSVPFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return

    setStatus('loading')
    setErrorMsg('')

    const payload: RSVPFormData = { ...form, language }

    try {
      if (isFirebaseConfigured()) {
        await submitRSVP(payload)
      } else {
        await new Promise((r) => setTimeout(r, 800))
        console.info('RSVP (demo mode — configure Firebase to save):', payload)
      }
      setStatus('success')
      setForm(emptyForm(language))
    } catch {
      setStatus('error')
      setErrorMsg(labels.error)
    }
  }

  if (status === 'success') {
    return (
      <section className="section rsvp-section">
        <div className="rsvp-container">
          <div className="rsvp-success">
            <div className="success-icon">✓</div>
            <h2>{labels.successTitle}</h2>
            <p>{labels.successMessage}</p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')}>
              {labels.submitAnother}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section rsvp-section">
      <div className="rsvp-container">
        <p className="section-label">{rsvp.sectionLabel}</p>
        <h2 className="section-title">{rsvp.title}</h2>
        <p className="rsvp-subtitle">{rsvp.subtitle}</p>
        <p className="rsvp-deadline">
          {rsvp.respondBy}{' '}
          {formatDisplayDate(rsvp.deadline, locale)}
        </p>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{labels.fullName} *</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder={labels.namePlaceholder}
            />
          </div>

          <div className="form-group">
            <label>{labels.attending}</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === 'yes'}
                  onChange={() => update('attending', 'yes')}
                />
                <span>{labels.accept}</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === 'no'}
                  onChange={() => update('attending', 'no')}
                />
                <span>{labels.decline}</span>
              </label>
            </div>
          </div>

          {form.attending === 'yes' && (
            <div className="form-group">
              <label htmlFor="guestCount">{labels.guestCount}</label>
              <select
                id="guestCount"
                value={form.guestCount}
                onChange={(e) => update('guestCount', Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">{labels.message}</label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder={labels.messagePlaceholder}
            />
          </div>

          {status === 'error' && <p className="form-error">{errorMsg}</p>}

          <button type="submit" className="btn btn-filled submit-btn" disabled={status === 'loading'}>
            {status === 'loading' ? labels.sending : labels.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
