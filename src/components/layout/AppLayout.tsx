import { type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { AnimatedBlobs } from './AnimatedBlobs'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AnimatedBlobs />
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  )
}
