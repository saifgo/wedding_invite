import { useMemo } from 'react'

const PETAL_COLORS = [
  '#fff5e8',
  '#fff9f2',
  '#f3e3c8',
  '#d8b36a',
  '#efd8a5',
]

interface PetalStyle {
  width: number
  height: number
  left: number
  background: string
  duration: number
  delay: number
  borderRadius: string
}

function randomPetal(): PetalStyle {
  const width = 5 + Math.random() * 7
  return {
    width,
    height: width * 1.5,
    left: Math.random() * 100,
    background: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    duration: 8 + Math.random() * 7,
    delay: Math.random() * 6,
    borderRadius: `${30 + Math.random() * 40}% 0 ${30 + Math.random() * 40}% 0`,
  }
}

interface Props {
  count?: number
  className?: string
}

export default function PetalsLayer({ count = 18, className = '' }: Props) {
  const petals = useMemo(
    () => Array.from({ length: count }, () => randomPetal()),
    [count]
  )

  return (
    <div className={`petals-layer ${className}`.trim()} aria-hidden="true">
      {petals.map((petal, i) => (
        <div
          key={i}
          className="petal"
          style={{
            width: `${petal.width}px`,
            height: `${petal.height}px`,
            left: `${petal.left}%`,
            background: petal.background,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            borderRadius: petal.borderRadius,
          }}
        />
      ))}
    </div>
  )
}
