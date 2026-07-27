/**
 * Pyodide service — singleton wrapper around the Pyodide runtime.
 *
 * Why a service instead of a hook: the Python runtime is a long-lived singleton
 * that should be initialized once and shared. A service keeps the lifecycle
 * separate from React rendering, while the `usePyodide` hook (in hooks/) adapts
 * it to React's lifecycle for components that need reactive status.
 *
 * The service fetches `/generator.py` (the original, preserved generator) and
 * calls `generate_readme(json_data)` — the same function the legacy app used.
 */

import type { BuilderData } from '@/types'

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL: string }) => Promise<PyodideInstance>
  }
}

interface PyodideInstance {
  globals: { set: (name: string, value: string) => void }
  runPythonAsync: (code: string) => Promise<unknown>
}

const PYODIDE_VERSION = '0.25.0'
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

class PyodideService {
  private instance: PyodideInstance | null = null
  private initPromise: Promise<PyodideInstance> | null = null
  private generatorLoaded = false

  async init(): Promise<PyodideInstance> {
    if (this.instance) return this.instance
    if (this.initPromise) return this.initPromise

    this.initPromise = this.doInit()
    return this.initPromise
  }

  private async doInit(): Promise<PyodideInstance> {
    if (!window.loadPyodide) {
      await this.loadScript(`${PYODIDE_INDEX}pyodide.js`)
    }
    const py = await window.loadPyodide!({ indexURL: PYODIDE_INDEX })
    await this.loadGenerator(py)
    this.instance = py
    return py
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  private async loadGenerator(py: PyodideInstance): Promise<void> {
    if (this.generatorLoaded) return
    const resp = await fetch('/generator.py')
    if (!resp.ok) throw new Error(`generator.py fetch failed: ${resp.status}`)
    const code = await resp.text()
    await py.runPythonAsync(code)
    this.generatorLoaded = true
  }

  async generate(data: BuilderData): Promise<string> {
    const py = await this.init()
    const json = JSON.stringify(data)
    py.globals.set('input_json', json)
    const result = await py.runPythonAsync(
      'import json; generate_readme(json.loads(input_json))',
    )
    return typeof result === 'string' ? result : String(result)
  }

  get isReady(): boolean {
    return this.instance !== null
  }
}

export const pyodideService = new PyodideService()
