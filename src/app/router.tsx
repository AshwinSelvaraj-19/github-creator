import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppLayout } from '@/components/layout/AppLayout'

const LandingPage = lazy(() => import('@/features/landing/LandingPage'))
const TemplatesPage = lazy(() => import('@/features/templates/TemplatesPage'))
const BuilderPage = lazy(() => import('@/features/builder/BuilderPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8b5cf6] border-t-transparent" />
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/builder" element={<BuilderPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  )
}
