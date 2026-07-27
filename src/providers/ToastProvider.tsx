/**
 * ToastProvider — global toast notification context.
 *
 * Why: toasts need to be triggered from anywhere (builder, services, providers)
 * without prop-drilling. This provider exposes `useToast()` which returns a
 * `show(message, type)` function. Toasts auto-dismiss after 4 seconds.
 */

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { GlassToast, type ToastData, type ToastType } from '@/components/ui/GlassToast'

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <GlassToast key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
