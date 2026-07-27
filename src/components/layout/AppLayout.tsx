import { type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { ImmersiveBackground } from './ImmersiveBackground'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <ImmersiveBackground />
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  )
}
