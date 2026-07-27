/**
 * usePyodide — React adapter for the PyodideService.
 *
 * Returns reactive `ready`, `loading`, `error` state and an `init` + `generate`
 * function. Components use this; the underlying service is framework-agnostic.
 */

import { useCallback, useState } from 'react'
import { pyodideService } from '@/services/pyodide.service'
import type { BuilderData } from '@/types'

export function usePyodide() {
  const [ready, setReady] = useState(pyodideService.isReady)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const init = useCallback(async () => {
    if (pyodideService.isReady) {
      setReady(true)
      return
    }
    setLoading(true)
    setError(null)
    try {
      await pyodideService.init()
      setReady(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pyodide init failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const generate = useCallback(
    async (data: BuilderData): Promise<string> => pyodideService.generate(data),
    [],
  )

  return { ready, loading, error, init, generate }
}
