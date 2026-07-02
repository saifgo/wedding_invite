import type { WeddingDay } from '../types/wedding'

function toGoogleDate(date: string, time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const d = new Date(date)
  d.setHours(hours, minutes, 0, 0)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  )
}

export function getGoogleCalendarUrl(day: WeddingDay): string {
  const firstEvent = day.events[0]
  const lastEvent = day.events[day.events.length - 1]
  const start = toGoogleDate(day.date, firstEvent.time)
  const endTime = lastEvent.time === firstEvent.time ? '23:00' : lastEvent.time
  const end = toGoogleDate(day.date, endTime)

  const details = day.events
    .map((e) => `${e.time} — ${e.title}: ${e.description}`)
    .join('\n')

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: day.title,
    dates: `${start}/${end}`,
    details,
    location: `${day.venue.name}, ${day.venue.address}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function getDirectionsUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
}

export function formatDisplayDate(dateStr: string, locale: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return locale.startsWith('ar')
    ? `${day} / ${month} / ${year}`
    : `${String(day).padStart(2, '0')} / ${String(month).padStart(2, '0')} / ${year}`
}

export function formatEventTime(time: string, locale: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const d = new Date()
  d.setHours(hours, minutes, 0, 0)
  return d.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !locale.startsWith('ar'),
  })
}
