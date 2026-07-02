import { useEffect, useMemo, useState } from 'react'
import type { LocalizedWeddingData } from '../types/wedding'
import ScrollIndicator from './ScrollIndicator'
import './CountdownSection.css'

interface Props {
  data: LocalizedWeddingData
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTargetDate(data: LocalizedWeddingData): Date {
  const sorted = [...data.days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const firstDay = sorted[0]
  const firstEvent = firstDay?.events[0]
  const dateStr = firstDay?.date ?? data.couple.weddingDate
  const timeStr = firstEvent?.time ?? '00:00'
  const [hours, minutes] = timeStr.split(':').map(Number)
  const target = new Date(dateStr + 'T00:00:00')
  target.setHours(hours, minutes, 0, 0)
  return target
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CountdownSection({ data }: Props) {
  const target = useMemo(() => getTargetDate(data), [data])
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { value: timeLeft.days, label: data.countdown.days },
    { value: timeLeft.hours, label: data.countdown.hours },
    { value: timeLeft.minutes, label: data.countdown.minutes },
    { value: timeLeft.seconds, label: data.countdown.seconds },
  ]

  return (
    <section className="section countdown-section">
      <div className="countdown-container">
        <p className="section-label">{data.countdown.sectionLabel}</p>
        <h2 className="section-title">{data.countdown.sectionTitle}</h2>

        <div className="countdown-grid">
          {units.map((unit) => (
            <div className="countdown-unit" key={unit.label}>
              <span className="countdown-value">{pad(unit.value)}</span>
              <span className="countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>

        <ScrollIndicator label={data.countdown.scroll} />
      </div>
    </section>
  )
}
