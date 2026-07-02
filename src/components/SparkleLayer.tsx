import { useMemo } from 'react'
import './SparkleLayer.css'

type SparkleVariant = 'star' | 'small' | 'dot'

interface SparkleStyle {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  variant: SparkleVariant
  peak: number
}

function randomSparkle(): SparkleStyle {
  const nearEdge = Math.random() > 0.35
  const left = nearEdge
    ? Math.random() > 0.5
      ? Math.random() * 14
      : 86 + Math.random() * 14
    : 8 + Math.random() * 84
  const top = nearEdge
    ? Math.random() > 0.5
      ? Math.random() * 18
      : 82 + Math.random() * 18
    : 8 + Math.random() * 84

  const roll = Math.random()
  const variant: SparkleVariant =
    roll > 0.65 ? 'star' : roll > 0.3 ? 'small' : 'dot'

  return {
    left,
    top,
    size: variant === 'dot' ? 0.35 + Math.random() * 0.25 : 0.55 + Math.random() * 0.65,
    delay: Math.random() * 5,
    duration: 2.2 + Math.random() * 2.5,
    variant,
    peak: 0.55 + Math.random() * 0.4,
  }
}

function SparkleIcon({ variant }: { variant: SparkleVariant }) {
  if (variant === 'dot') {
    return (
      <svg viewBox="0 0 8 8" aria-hidden="true">
        <circle cx="4" cy="4" r="3.2" className="sparkle-fill" />
        <circle cx="4" cy="4" r="3.2" className="sparkle-ring" />
      </svg>
    )
  }

  if (variant === 'small') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          className="sparkle-fill"
          d="M8 1 9.2 6.2 14.5 7.5 9.2 8.8 8 14 6.8 8.8 1.5 7.5 6.8 6.2Z"
        />
        <path
          className="sparkle-ring"
          d="M8 1 9.2 6.2 14.5 7.5 9.2 8.8 8 14 6.8 8.8 1.5 7.5 6.8 6.2Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="sparkle-fill"
        d="M12 2 14.2 9.5 22 11.8 14.2 14.1 12 21.5 9.8 14.1 2 11.8 9.8 9.5Z"
      />
      <path
        className="sparkle-ring"
        d="M12 2 14.2 9.5 22 11.8 14.2 14.1 12 21.5 9.8 14.1 2 11.8 9.8 9.5Z"
      />
    </svg>
  )
}

interface Props {
  count?: number
}

export default function SparkleLayer({ count = 16 }: Props) {
  const sparkles = useMemo(
    () => Array.from({ length: count }, () => randomSparkle()),
    [count]
  )

  return (
    <div className="sparkle-layer" aria-hidden="true">
      {sparkles.map((sparkle, i) => (
        <span
          key={i}
          className={`sparkle-layer-item sparkle-layer-item--${sparkle.variant}`}
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}rem`,
            height: `${sparkle.size}rem`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            ['--sparkle-peak' as string]: sparkle.peak,
          }}
        >
          <SparkleIcon variant={sparkle.variant} />
        </span>
      ))}
    </div>
  )
}
