import { useCallback, useRef, useState } from 'react'
import type { BuilderData } from '@/types'

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL: string }) => Promise<PyodideInterface>
  }
}

interface PyodideInterface {
  globals: { set: (name: string, value: string) => void }
  runPythonAsync: (code: string) => Promise<unknown>
}

const PYODIDE_VERSION = '0.25.0'
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodidePromise: Promise<PyodideInterface> | null = null
let generatorLoaded = false

async function loadPyodideRuntime(): Promise<PyodideInterface> {
  if (pyodidePromise) return pyodidePromise
  pyodidePromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = `${PYODIDE_INDEX}pyodide.js`
        script.onload = () => resolve(null)
        script.onerror = () => reject(new Error('Failed to load Pyodide script'))
        document.head.appendChild(script)
      })
    }
    const py = await window.loadPyodide!({ indexURL: PYODIDE_INDEX })
    return py
  })()
  return pyodidePromise
}

async function ensureGeneratorLoaded(py: PyodideInterface): Promise<void> {
  if (generatorLoaded) return
  const resp = await fetch('/generator.py')
  if (!resp.ok) throw new Error(`generator.py fetch failed: ${resp.status}`)
  const code = await resp.text()
  await py.runPythonAsync(code)
  generatorLoaded = true
}

export function usePyodide() {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pyRef = useRef<PyodideInterface | null>(null)

  const init = useCallback(async () => {
    if (ready || loading) return
    setLoading(true)
    setError(null)
    try {
      const py = await loadPyodideRuntime()
      await ensureGeneratorLoaded(py)
      pyRef.current = py
      setReady(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown Pyodide error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [ready, loading])

  const generate = useCallback(
    async (data: BuilderData): Promise<string> => {
      const py = pyRef.current
      if (!py) throw new Error('Pyodide not initialized')
      const json = JSON.stringify(data)
      py.globals.set('input_json', json)
      const result = await py.runPythonAsync(
        'import json; generate_readme(json.loads(input_json))',
      )
      return typeof result === 'string' ? result : String(result)
    },
    [],
  )

  return { ready, loading, error, init, generate }
}
