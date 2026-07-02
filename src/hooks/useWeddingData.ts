import { useEffect, useState } from 'react'
import type { WeddingDataRoot } from '../types/wedding'

export function useWeddingData() {
  const [data, setData] = useState<WeddingDataRoot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/wedding-data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load wedding data')
        return res.json()
      })
      .then((json: WeddingDataRoot) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
