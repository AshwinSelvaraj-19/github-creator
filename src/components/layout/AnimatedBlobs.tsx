import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface BlobConfig {
  color: string
  size: number
  x: string
  y: string
  duration: number
  delay: number
}

const BLOBS: BlobConfig[] = [
  { color: 'rgba(139, 92, 246, 0.35)', size: 520, x: '-10%', y: '-5%', duration: 18, delay: 0 },
  { color: 'rgba(6, 182, 212, 0.30)', size: 460, x: '70%', y: '5%', duration: 22, delay: 2 },
  { color: 'rgba(236, 72, 153, 0.25)', size: 400, x: '60%', y: '60%', duration: 20, delay: 4 },
  { color: 'rgba(249, 115, 22, 0.20)', size: 360, x: '5%', y: '65%', duration: 24, delay: 1 },
]

export function AnimatedBlobs() {
  const blobs = useMemo(() => BLOBS, [])
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
